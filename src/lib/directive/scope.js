export default {
  bind (el, binding, vnode) {
    const { context } = vnode
    context.introScope = true
    context.__introSteps = context.$introHub.getSteps()
    context.$introHub.clear()
  }
}
