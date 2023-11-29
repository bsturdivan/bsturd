import logo from './handle.html'
import keyframes from '../keyframes/keyframes.css' assert { type: 'css' }
import sheet from './styles.css' assert { type: 'css' }
import random from '../lib/Random'

class Handle extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    if (this.shadowRoot.styleSheets.length === 0) {
      this.shadowRoot.adoptedStyleSheets = [keyframes, sheet]
    }

    this.render()
  }

  render() {
    const parser = new DOMParser()
    const markup = parser.parseFromString(logo.trim(), 'text/html').body.firstChild

    document.addEventListener('toggleNavigation', event => this.toggleSideNav(event, markup))

    this.shadowRoot.appendChild(markup)
  }

  getInterval() {
    return random({ min: 200, max: 3000 })
  }

  getXOffset() {
    return random({ min: -2, max: 6 })
  }

  toggleSideNav(event, menu) {
    const el = event.detail.element
    const isOpen = event.detail.open

    if (isOpen) {
      menu.classList.add('handle__container--open')
    } else {
      menu.classList.remove('handle__container--open')
    }
  }
}

export default Handle
