/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */

function findParams(node, params = []) {
  if (node.displayName === 'Param' || node.displayName === 'Splat') {
    params.push(node.props.name)
  }
  node.children.forEach(child => findParams(child, params))
  return params
}

export default function transformParams(route, path) {
  const params = findParams(route.ast)
  params.forEach((param, paramIndex) => {
    path = path.replace(new RegExp(`([^\\\\]){${param}}`, 'g'), () => `/\\${paramIndex + 1}`)
  })
  return path
}
