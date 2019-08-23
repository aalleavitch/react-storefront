/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */

export default function transformParams(path) {
  let index = 1
  return path.replace(/\${\w+}/g, () => `\\${index++}`)
}
