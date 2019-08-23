/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */

import transformParams from './transformParams'

export default function fromOrigin(backend) {
  const type = 'fromOrigin'
  const props = {
    proxy: {
      backend
    }
  }
  return {
    type,
    props,
    transformPath: path => {
      props.proxy.rewrite_path_regex = transformParams(path)
      return { type, props }
    }
  }
}
