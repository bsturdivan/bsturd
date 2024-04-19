import logo from './logo.html'
import keyframes from '../keyframes/keyframes.css' assert { type: 'css' }
import sheet from './styles.css' assert { type: 'css' }

class Logo extends HTMLElement {
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

    this.shadowRoot.appendChild(markup)
  }
}

export default Logo
