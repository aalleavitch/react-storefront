import cheerio from 'cheerio'
import optimizeImages from '../../src/utils/optimizeImages'

import nock from 'nock'

describe('optimizeImages', () => {
  afterEach(() => nock.cleanAll())

  it('should transform image src to come from our optimizer', async () => {
    const $ = cheerio.load(`
    <div>
      <img src="http://placekitten.com/200/300">
    </div>
    `)
    optimizeImages($('img'))
    expect($.html({ decodeEntities: false })).toEqual(`
    <div>
      <img src="https://opt.moovweb.net/?quality=75&img=http%3A%2F%2Fplacekitten.com%2F200%2F300">
    </div>
    `)
  })
  it('should transform multiple images with given quality', async () => {
    const $ = cheerio.load(`
    <div>
      <img src="http://placekitten.com/200/300">
      <img src="http://placekitten.com/500">
    </div>
    `)
    optimizeImages($('img'), { quality: 50 })
    expect($.html({ decodeEntities: false })).toEqual(`
    <div>
      <img src="https://opt.moovweb.net/?quality=50&img=http%3A%2F%2Fplacekitten.com%2F200%2F300">
      <img src="https://opt.moovweb.net/?quality=50&img=http%3A%2F%2Fplacekitten.com%2F500">
    </div>
    `)
  })
  it('should be able to select specific images to transform', async () => {
    const $ = cheerio.load(`
    <div>
      <img src="http://placekitten.com/200/300">
      <img class="test" src="http://placekitten.com/500">
      <img src="http://placekitten.com/400">
    </div>
    `)
    optimizeImages($('.test'), { quality: 50 })
    expect($.html({ decodeEntities: false })).toEqual(`
    <div>
      <img src="http://placekitten.com/200/300">
      <img class="test" src="https://opt.moovweb.net/?quality=50&img=http%3A%2F%2Fplacekitten.com%2F500">
      <img src="http://placekitten.com/400">
    </div>
    `)
  })
  it('should be able to prevent layout instability', async () => {
    nock('https://image.moovweb.net')
      .get('/size?url=http%3A%2F%2Fplacekitten.com%2F200%2F300')
      .reply(200, '{"width":200,"height":300}', { 'content-type': 'application/json' })

    // <img src="http://placekitten.com/400">
    const $ = cheerio.load(`
    <div>
      <img src="http://placekitten.com/200/300">
    </div>
    `)
    await optimizeImages($('img'), { quality: 50, preventLayoutInstability: true })
    expect($.html({ decodeEntities: false })).toEqual(`
    <div>
      <img src="https://opt.moovweb.net/?quality=50&img=http%3A%2F%2Fplacekitten.com%2F200%2F300" width="200" height="300">
    </div>
    `)
    // <img src="http://placekitten.com/400" width="400" height="400">
  })
})
