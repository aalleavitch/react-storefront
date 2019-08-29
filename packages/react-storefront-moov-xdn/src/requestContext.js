// import { setImplementation } from 'react-storefront/requestContext'
import { setImplementation } from '../../react-storefront/src/requestContext'

const implementation = {
  get(key) {
    if (!env.request_context) {
      env.request_context = {}
    }
    return env.request_context[key]
  },
  set(key, value) {
    if (!env.request_context) {
      env.request_context = {}
    }
    env.request_context[key] = value
  }
}

setImplementation(implementation)

export default implementation
