/**
 * @typedef {Object} DynamicRule
 * @property {HTMLElement} parent
 * @property {HTMLElement} element
 * @property {HTMLElement} to
 * @property {number} breakpoint
 * @property {'first'|'last'|number} order
 * @property {number} index
 */

/**
 * @param {'min' | 'max'} type
 */
export function useDynamicAdapt(type = 'max') {
  const className = '_dynamic_adapt_'
  const attrNames = ['data-da', 'data-da-mob']

  /** @type {Map<HTMLElement, DynamicRule[]>} */
  const rulesByElement = getRulesByElement()
  if (!rulesByElement.size) return

  const update = () => {
    rulesByElement.forEach((rules, element) => {
      const activeRule = getActiveRule(rules)

      if (!activeRule) {
        if (element.classList.contains(className)) {
          moveBack(rules[0])
        }
        return
      }

      moveTo(activeRule)
    })
  }

  window.addEventListener('resize', update)
  update()

  function getRulesByElement() {
    /** @type {Map<HTMLElement, DynamicRule[]>} */
    const map = new Map()
    const selector = attrNames.map((attr) => `[${attr}]`).join(',')
    const elements = [...document.querySelectorAll(selector)]

    elements.forEach((element) => {
      /** @type {DynamicRule[]} */
      const rules = []

      attrNames.forEach((attrName) => {
        const attr = element.getAttribute(attrName)
        if (!attr) return

        const [toSelector, breakpointRaw, orderRaw] = attr.split(',').map((val) => val.trim())
        const to = document.querySelector(toSelector)
        if (!to) return

        rules.push({
          parent: element.parentElement,
          element,
          to,
          breakpoint: Number(breakpointRaw ?? 767),
          order: orderRaw !== undefined ? (isNumber(orderRaw) ? Number(orderRaw) : orderRaw) : 'last',
          index: getIndexInParent(element, element.parentElement),
        })
      })

      if (!rules.length) return

      map.set(element, rules.sort((a, b) => a.breakpoint - b.breakpoint))
    })

    return map
  }

  /**
   * @param {DynamicRule[]} rules
   * @returns {DynamicRule|null}
   */
  function getActiveRule(rules) {
    const width = window.innerWidth
    const matchingRules = rules.filter((rule) => (type === 'max' ? width <= rule.breakpoint : width >= rule.breakpoint))
    if (!matchingRules.length) return null

    // For max: prefer tighter (smaller) breakpoint, e.g. 767 over 1400.
    // For min: prefer tighter (larger) breakpoint.
    return type === 'max' ? matchingRules[0] : matchingRules[matchingRules.length - 1]
  }

  /**
   * @param {DynamicRule} rule
   */
  function moveTo(rule) {
    const { to, element, order } = rule
    element.classList.add(className)

    if (order === 'last' || (typeof order === 'number' && order >= to.children.length)) {
      to.append(element)
      return
    }

    if (order === 'first') {
      to.prepend(element)
      return
    }

    if (typeof order === 'number' && to.children[order]) {
      to.children[order].before(element)
      return
    }

    to.append(element)
  }

  /**
   * @param {DynamicRule} rule
   */
  function moveBack(rule) {
    const { parent, element, index } = rule
    element.classList.remove(className)

    if (index >= 0 && parent.children[index]) {
      parent.children[index].before(element)
    } else {
      parent.append(element)
    }
  }

  /**
   * @param {HTMLElement} element
   * @param {HTMLElement} parent
   */
  function getIndexInParent(element, parent) {
    return [...parent.children].indexOf(element)
  }

  function isNumber(value) {
    return !isNaN(value)
  }
}
