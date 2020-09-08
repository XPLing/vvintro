export default {
  bind (el, binding, vnode) {
    el.dataset.intro = binding.value
    const { context } = vnode
    const step = {
      el,
      ...binding.value
    }
    context.$introHub.$emit('add', step)
  }
}
