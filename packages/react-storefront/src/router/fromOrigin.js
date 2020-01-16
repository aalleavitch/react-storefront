/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */

import transformParams from './transformParams'
import proxyUpstream from './proxyUpstream'

export default function fromOrigin(backend = 'origin') {
  const type = 'fromOrigin'
  const config = {
    proxy: {
      backend
    }
  }
  const runOn = { server: true, client: false }

  return {
    ...proxyUpstream(),
    type,
    config: () => config,

    // note as of react-storefront-edge@4.0.0, this is no longer used but is kept here for backwards compatibility
    transformPath: path => {
      return {
        type,
        runOn,
        config: routePath => {
          config.proxy.rewrite_path_regex = transformParams(routePath, path)
          return config
        }
      }
    }
  }
}
