import html from './markup.html'
import sheet from './styles.css' assert { type: 'css' }
import Logo from '../logo'
import Handle from '../handle'
import { themeChanged } from '../lib/events'

class Navigation extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    customElements.define('navigation-logo', Logo)
    customElements.define('navigation-handle', Handle)
  }

  connectedCallback() {
    if (this.shadowRoot.styleSheets.length === 0) {
      this.shadowRoot.adoptedStyleSheets = [sheet]
    }

    this.render()
  }

  render() {
    const parser = new DOMParser()
    const markup = parser.parseFromString(html.trim(), 'text/html').body
      .firstChild

    markup.addEventListener('click', this.toggleTheme, true)

    const themeButtons = [...markup.getElementsByClassName('navigation__item')]

    document.addEventListener('themeChanged', (event) => {
      const el = themeButtons.find(
        (item) => item.getAttribute('data-scheme') === event.detail.theme,
      )
      event.detail.element.setAttribute('value', event.detail.value)
    })

    for (let i = 0; i < themeButtons.length; i++) {
      const scheme = themeButtons[i].getAttribute('data-scheme')
      const themeValue = window.localStorage.getItem(scheme)
      themeButtons[i].setAttribute('value', themeValue)
    }

    this.shadowRoot.appendChild(markup)
  }

  toggleTheme(event) {
    const el = event.target

    if (el.getAttribute('name') !== 'scheme') {
      return false
    }

    const valueAttribute = el.getAttribute('value').toLowerCase()
    const boolValue = JSON.parse(valueAttribute)
    const scheme = el.dataset.scheme.toLowerCase()
    const value = JSON.stringify(!boolValue)

    document.dispatchEvent(themeChanged({ element: el, theme: scheme, value }))
  }
}

export default Navigation