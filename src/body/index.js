import html from './markup.html'
import sheet from './styles.css' assert { type: 'css' }

class Body extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
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
  }
}

export default Body
