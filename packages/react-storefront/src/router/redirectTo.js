/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */

import transformParams from './transformParams'

export default function redirectTo(path) {
  const type = 'redirectTo'
  const props = {
    redirect: {
      rewrite_path_regex: transformParams(path)
    }
  }
  return {
    type,
    props,
    withStatus: status => {
      props.redirect.status = status
      return { type, props }
    }
  }
}
