export default {
  bind (el, binding, vnode) {
    const { value } = binding
    el.clickCb = function cb (e) {
      if (e.target === el) {
        value && value.call(this)
      }
    }

    el.addEventListener('click', el.clickCb)
  },
  unbind (el, binding, vnode) {
    el.removeEventListener('click', el.clickCb)
    delete el.clickCb
  }
}
