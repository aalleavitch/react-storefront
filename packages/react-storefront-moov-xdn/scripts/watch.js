const webpack = require('webpack')
const { blue, bold, green, yellow } = require('chalk')
const path = require('path')
const { clear, log } = console
const { emojify } = require('node-emoji')
const fs = require('fs')
const { fork } = require('child_process')
const tmp = path.join(process.cwd(), 'tmp')
const builds = []
const config = require('./getMoovwebConfig')()

if (!config) {
  log(
    red(
      bold(
        `Error: No moovweb config found for environment ${
          process.env.NODE_ENV
        }.  Please ensure that your package json has a "moovweb" object with a "${
          process.env.NODE_ENV
        }" key.`
      )
    )
  )
  process.exit(0)
}

let buildsInProgress = 0
let initializing = true
let moovsdk

function main() {
  if (!fs.existsSync(tmp)) {
    fs.mkdirSync(tmp)
  }

  clear()

  log(
    blue(bold(emojify(':hammer_and_wrench:  Building React Storefront app for the Moovweb XDN...')))
  )

  for (let key in config.builds) {
    createCompiler(config.builds[key])
  }

  // const moovsdkPath = path.join(process.cwd(), 'node_modules', 'moovsdk')
  const moovsdkPath = path.join('/Users/markbrocato/Code/moovworker/sdk/sdk-cli')

  moovsdk = fork(moovsdkPath, ['start', '--no-build', '--pause', ...process.argv.slice(2)], {
    silent: true
  })

  moovsdk.stdout.on('data', data => {
    // if (!initializing && buildsInProgress === 0) {
    process.stdout.write(data)
    // }
  })

  moovsdk.stderr.on('data', data => {
    // if (!initializing && buildsInProgress === 0) {
    process.stderr.write(data)
    // }
  })

  initializing = false
}

function createCompiler(config) {
  const build = { errors: false }
  const compiler = webpack(require(path.resolve(config))())

  compiler.plugin('watch-run', (_compiler, callback) => {
    if (!initializing) {
      clear()
      process.stdout.write(blue(bold(emojify(':hammer_and_wrench:  Rebuilding... '))))
    }
    buildStarted()
    callback()
  })

  compiler.watch({}, (err, stats) => reportErrors.bind(build, err, stats))
  compiler.plugin('done', buildEnded)
  builds.push(build)
}

function buildStarted() {
  if (buildsInProgress++ === 0 && moovsdk) {
    moovsdk.send('pause-requests')
  }
}

function buildEnded() {
  if (--buildsInProgress === 0 && moovsdk) {
    moovsdk.send('resume-requests')
  }

  if (!builds.some(b => b.errors) && buildsInProgress === 0) {
    process.stdout.write(green(bold(emojify('Build successful! :tada:\n\n'))))
  }
}

function reportErrors(build, err, stats) {
  if (err) {
    log(red(`Error in ${key} Webpack configuration.`))
    log(red(err.stack || err.message))

    if (err.details) {
      log(red(err.details))
    }

    return
  }

  const info = stats.toJson()

  if (stats.hasErrors()) {
    build.errors = true
    log(red(bold(emojify('\n:boom:  Error(s) occurred while building your app:\n'))))

    for (let error of Array.from(info.errors)) {
      log(red(error))
    }
    return
  } else {
    build.errors = false
  }

  if (stats.hasWarnings()) {
    for (let warning of Array.from(info.warnings)) {
      log(yellow(warning))
    }
  }
}

main()