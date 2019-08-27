/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */

import transformParams from './transformParams'

export default function fromOrigin(backend) {
  const type = 'fromOrigin'
  const config = {
    proxy: {
      backend
    }
  }
  return {
    type,
    config: () => config,
    transformPath: path => {
      return {
        type,
        config: routePath => {
          config.proxy.rewrite_path_regex = transformParams(routePath, path)
          return config
        }
      }
    }
  }
}
