let impl

export function setImplementation(i) {
  impl = i
}

export default {
  get(...args) {
    return impl.get(...args)
  },
  set(...args) {
    impl.set(...args)
  }
}
