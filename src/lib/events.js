export const themeChanged = (detail = {}) => {
  return new CustomEvent('themeChanged', {
    bubbles: true,
    detail,
    composed: true,
  })
}

export const triggerThemeChange = (detail = {}) => {
  return new CustomEvent('triggerThemeChange', {
    bubbles: true,
    detail,
    composed: true,
  })
}

export const toggleNavigation = (detail = {}) => {
  return new CustomEvent('toggleNavigation', {
    bubbles: true,
    detail,
    composed: true,
  })
}
