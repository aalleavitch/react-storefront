/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */

import transformParams from './transformParams'

export default function redirectTo(path) {
  const type = 'redirectTo'
  const config = (routePath, status) => ({
    redirect: {
      rewrite_path_regex: transformParams(routePath, path),
      ...(status ? { status } : {})
    }
  })
  return {
    type,
    config,
    withStatus: status => {
      return { type, config: routePath => config(routePath, status) }
    }
  }
}
