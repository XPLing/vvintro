import hub from './util/hub'
import { DEFAULT_OPTIONS } from './conf'
import DIRECTIVES from './directive'
import mixin from './mixin'
import './style/global.styl'
import VVIntro from './core'

let Vue = null
VVIntro.install = function (_Vue, options) {
  options = Object.assign({}, DEFAULT_OPTIONS, options)
  Vue = _Vue
  Vue.prototype.$intro = (insertTarget, options) => {
    if (!(insertTarget instanceof HTMLElement)) {
      if (Object.prototype.toString.call(insertTarget) === '[object Object]') {
        options = insertTarget
      }
      insertTarget = document.body
    }
    return new VVIntro(insertTarget, options)
  }
  const HubComp = Vue.extend(hub)
  Vue.prototype.$introHub = new HubComp()
  Vue.directive('intro', DIRECTIVES.intro)
  Vue.directive('intro-scope', DIRECTIVES.scope)
  Vue.mixin(mixin)
}
export default VVIntro
