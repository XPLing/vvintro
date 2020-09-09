export default {
  bind (el, binding, vnode) {
    const { context } = vnode
    const step = {
      el,
      ...binding.value
    }
    context.$introHub.$emit('add', step)
  }
}
