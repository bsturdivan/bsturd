import { ga } from '../lib/ga'
import html from './markup.html'
import sheet from './styles.css' assert { type: 'css' }
import Navigation from '../navigation'
import Body from '../body'
import { themeChanged } from '../lib/events'
import { SCHEMES, DARKEN_RATIO, MIDTONE_RATIO } from '../lib/themes'

class Layout extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    customElements.define('navigation-nav', Navigation)
    customElements.define('bsturd-body', Body)

    ga.page()
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

    this.shadowRoot.appendChild(markup)

    const storedDarkTheme = window.localStorage.getItem(SCHEMES.dark) || false
    const storedDesaturatedTheme = window.localStorage.getItem(
      SCHEMES.desaturated,
    ) || false
    const storedBionicTheme = window.localStorage.getItem(SCHEMES.bionic)

    this.darkTheme(storedDarkTheme)
    this.desaturateTheme(storedDesaturatedTheme)
    this.bionicTheme(storedBionicTheme)

    document.addEventListener('themeChanged', (event) => {
      ga.track('themeChange', { theme: event.detail.theme, value: event.detail.value })

      if (event.detail.theme === SCHEMES.dark) {
        this.darkTheme(event.detail.value)
      }

      if (event.detail.theme === SCHEMES.desaturated) {
        this.desaturateTheme(event.detail.value)
      }

      if (event.detail.theme === SCHEMES.bionic) {
        this.bionicTheme(event.detail.value)
      }
    })

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches ||
      !window.localStorage.hasOwnProperty(SCHEMES.dark) ||
        window.localStorage.getItem(SCHEMES.dark) === 'null')
    ) {
      document.dispatchEvent(
        themeChanged({ theme: SCHEMES.dark, value: 'true' }),
      )
    }
  }

  darkTheme(value) {
    const parsedvalue = JSON.parse(value)

    window.localStorage.setItem(SCHEMES.dark, parsedvalue)
    document.documentElement.style.setProperty('--darken-ratio', DARKEN_RATIO[parsedvalue])
    document.documentElement.style.setProperty(
      '--midtone-darken-ratio',
      MIDTONE_RATIO[parsedvalue],
    )
  }

  desaturateTheme(value) {
    const parsedvalue = JSON.parse(value)
    const ratio = parsedvalue ? 0 : 1
    document.documentElement.style.setProperty('--saturation', ratio)
    window.localStorage.setItem(SCHEMES.desaturated, parsedvalue)
  }

  bionicTheme(value) {
    const parsedvalue = JSON.parse(value)
    window.localStorage.setItem(SCHEMES.bionic, parsedvalue)
  }
}

export default Layout
