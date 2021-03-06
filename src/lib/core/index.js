import { getWinSize, getOffsetTop } from '../util/scroll'
import introCreate from '../dom'

let cid = 0
const INSTANCE = []
export default class VVIntro {
  constructor (insertTarget, options) {
    this.options = Object.assign({}, VVIntro._OPTIONS, options)
    this.id = ++cid
    this.elm = null // intro dom
    this.introComp = null // intro dom component instance
    this.insertTarget = insertTarget // the parent dom for to insert intro dom
    this.currentStep = null // current step
    this.oldStep = null // previous step
    this.stepItems = [] // step collections
    this.introCreate()
  }

  init = () => {
    const hasId = INSTANCE.find(item => item.id === this.id)
    if (!hasId) INSTANCE.push(this)
  }

  start = () => {
    this.introComp.show()
    this.step(1)
  }

  step = (num) => {
    this.resetStepsStatus()
    const stepItem = this.stepItems.find(item => item.step === num)
    if (stepItem) {
      this.oldStep = this.currentStep
      this.currentStep = stepItem
      this.showStep()
      this.changeIntroPosition()
    }
  }

  toStep = (num) => {
    if (typeof value === 'number' && !isNaN(value)) throw new TypeError(`No found the step.`)
    const length = this.stepItems.length
    if (num > length) throw new TypeError(`No found next step, max step is ${this.currentStep.step}.`)
    this.step(num)
  }

  nextStep () {
    const length = this.stepItems.length
    if (this.currentStep.step >= length) throw new TypeError(`No found next step, max step is ${this.currentStep.step}.`)
    this.step(this.currentStep.step + 1)
  }

  prevStep () {
    if (this.currentStep.step < 1) throw new TypeError('No found previous step, min step is 1.')
    this.step(this.currentStep.step - 1)
  }

  resetStepsStatus () {
    // reset show status of current step
    const currentShowStep = document.body.querySelector('[data-intro].vintro-show')
    if (!currentShowStep) return false
    const className = currentShowStep.className.replace(/\s?vintro-show\s?/, '')
    currentShowStep.className = className
  }

  showStep () {
    const { el: oldEl } = this.oldStep || {}
    const { el } = this.currentStep
    // clear intro show status of the previous step element
    if (oldEl) {
      oldEl.className = oldEl.className.repeat(/\s?vintro-show/, '')
    }
    // add 'vintro-show' class to adjustment 'z-index' of the step target elemet
    el.className = el.className ? el.className + ' vintro-show' : 'vintro-show'
  }

  // set position of the intro dom according the current step dom
  changeIntroPosition = () => {
    const { el, step } = this.currentStep
    this.introComp.move(el, step, this)
  }

  close = () => {
    this.introComp.hide()
  }

  initSteps = () => {
    const { __introSteps } = this.options.introTargetComp
    if (__introSteps) {
      __introSteps.forEach(step => {
        this.addStep(step)
      })
    }
  }

  addStep = (step) => {
    this.stepItems.push(step)
    this.stepItems.sort(function (a, b) {
      return a.step - b.step
    })
  }

  create = (...args) => new VVIntro(...args)
  introCreate = () => {
    this.init()
    const comp = introCreate(this.options, this.insertTarget)
    this.elm = comp.$el
    this.introComp = comp
    if (this.options.introTargetComp) {
      this.initSteps()
    }
    return comp
  }

  clear () {
    let index
    let instance = INSTANCE.find((item, idx) => {
      if (item.id === this.id) {
        index = idx
        return item
      }
    })
    this.introComp && this.introComp.remove()
    this.introComp = null
    if (instance) {
      instance = null
      INSTANCE.splice(index, 1)
    }
  }

  /**
   * To change the scroll of `window` after highlighting an element
   *
   * @api private
   * @method _scrollTo
   * @param {String} scrollTo
   * @param {Object} targetElement
   * @param {Object} tooltipLayer
   */
  scrollTo (targetElement, tooltipLayer, scrollTo) {
    scrollTo = scrollTo || this.options.scrollTo
    if (scrollTo === 'off') return
    let rect
    const layerRect = tooltipLayer.getBoundingClientRect()
    const targetRect = targetElement.getBoundingClientRect()
    if (!this.options.scrollToElement) return

    if (scrollTo === 'tooltip') {
      rect = layerRect
    } else {
      rect = targetRect
    }
    if (!_elementInViewport(targetElement)) {
      const scrollTop = this.getScrollDistance(targetElement, tooltipLayer, rect)
      window.scrollBy(0, scrollTop)
    }
  }

  getScrollDistance (targetElement, tooltipLayer, rect) {
    let res
    const winHeight = getWinSize().height
    if (top < 0 || targetElement.clientHeight > winHeight) {
      //Scroll down
      res = rect.top - ((winHeight / 2) - (rect.height / 2)) - this.options.scrollPadding // 30px padding from edge to look nice
    } else {
      res = rect.top - ((winHeight / 2) - (rect.height / 2)) + this.options.scrollPadding // 30px padding from edge to look nice
    }
    return res
  }

  checkToolPosition (targetElement, tooltipLayer, toolTipPosition) {
    const rect = targetElement.getBoundingClientRect()
    const rectToolTipLayer = tooltipLayer.getBoundingClientRect()
    const offset = getOffsetTop(targetElement)
    const top = offset.top
    const docHeight = Math.max(document.documentElement.offsetHeight, window.innerHeight)
    const docWidth = Math.max(document.documentElement.offsetWidth, window.innerWidth)
    const contentHeight = rect.height + rectToolTipLayer.height
    const contentWidth = Math.max(rect.width, rectToolTipLayer.width)
    if (toolTipPosition === 'bottom') {
      if (offset.top + contentHeight >= docHeight) {
        return 'top'
      }
    }
    if (toolTipPosition === 'top') {
      if (offset.top < contentHeight + 15) {
        return 'bottom'
      }
    }
    if (toolTipPosition === 'left') {
      if (offset.left < contentWidth + 15) {
        if (offset.right < docWidth) {
          return 'right'
        } else if (offset.top + contentHeight < docHeight) {
          return 'bottom'
        }
        return 'top'
      }
    }
    if (toolTipPosition === 'right') {
      if (offset.right > docWidth) {
        if (offset.left > contentWidth + 15) {
          return 'left'
        } else if (offset.top + contentHeight < docHeight) {
          return 'bottom'
        }
        return 'top'
      }
    }
    return false
  }
}
VVIntro._OPTIONS = {
  /* Next button label in tooltip box */
  nextLabel: 'Next &rarr;',
  /* Previous button label in tooltip box */
  prevLabel: '&larr; Back',
  /* Skip button label in tooltip box */
  skipLabel: 'Skip',
  /* Intro target Component */
  introTargetComp: null,
  /* Padding to add after scrolling when element is not in the viewport (in pixels) */
  scrollPadding: 30,
  /* Scroll to highlighted element? */
  scrollToElement: true,
  /*
   * Should we scroll the tooltip or target element?
   *
   * Options are: 'element' or 'tooltip'
   */
  scrollTo: 'element',
  toolTipPosition: 'bottom'
}

/**
 * @api private
 * @method _elementInViewport
 * @param {Object} el
 */
function _elementInViewport (el) {
  var rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    (rect.bottom + 80) <= window.innerHeight && // add 80 to get the text right
    rect.right <= window.innerWidth
  )
}

