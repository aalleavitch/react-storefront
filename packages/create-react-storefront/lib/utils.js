const path = require('path')

/**
 * Return the target path to the React Storefront directory.
 *
 * @param {Object} userConfig The user's selected configuration options.
 */
const calculateReactStorefrontPath = (projectName, userConfig) => {
  let targetPath = process.cwd()
  if (userConfig.createDirectory) {
    targetPath = path.resolve(targetPath, projectName)
  }
  return targetPath
}

module.exports = {
  calculateReactStorefrontPath
}
