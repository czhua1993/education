const CssLoaded: Record<string, boolean> = {}

/**
 * 加载 css
 * @param cssId
 * @param href
 * @param config
 */
export const loadCss = (href: string, id?: string, config?: object) => {
  if (CssLoaded[id || href]) {
    return
  }
  CssLoaded[id || href] = true
  const head = window.document.getElementsByTagName('head')[0]
  const link = window.document.createElement('link')
  link.href = href
  if (id) {
    link.id = id
  }
  link.rel = 'stylesheet'
  link.type = 'text/css'
  Object.assign(link, config || {})
  head.appendChild(link)
}
