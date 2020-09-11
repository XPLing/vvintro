export function getOffset (element) {
  const body = document.body
  const docEl = document.documentElement
  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft
  const x = element.getBoundingClientRect()
  return {
    top: x.top + scrollTop,
    width: x.width,
    height: x.height,
    left: x.left + scrollLeft
  }
}

/**
 * @param Element element
 * @return Element
 */
export function getScrollParent (element) {
  let style = window.getComputedStyle(element)
  const excludeStaticParent = (style.position === 'absolute')
  const overflowRegex = /(auto|scroll)/

  if (style.position === 'fixed') return document.body

  for (let parent = element; (parent = parent.parentElement);) {
    style = window.getComputedStyle(parent)
    if (excludeStaticParent && style.position === 'static') {
      continue
    }
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) return parent
  }

  return document.body
}

export function getOffsetTop (el) {
  let left = el.offsetLeft, right, top = el.offsetTop, bottom
  while (el.offsetParent) {
    left += el.offsetLeft
    top += el.offsetTop
    el = el.offsetParent
  }
  right = left + el.offsetWidth
  bottom = top + el.offsetHeight
  return {
    top,
    bottom,
    left,
    right
  }
}

/**
 * Provides a cross-browser way to get the screen dimensions
 * @api private
 * @method _getWinSize
 * @returns {Object} width and height attributes
 */
export function getWinSize () {
  if (window.innerWidth !== undefined) {
    return { width: window.innerWidth, height: window.innerHeight }
  } else {
    var D = document.documentElement
    return { width: D.clientWidth, height: D.clientHeight }
  }
}

/**
 * @api private
 * @method _elementInViewport
 * @param {Object} el
 */
export function elementInViewport (el) {
  var rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    (rect.bottom + 80) <= window.innerHeight && // add 80 to get the text right
    rect.right <= window.innerWidth
  )
}

