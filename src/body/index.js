import html from './markup.html'
import sheet from './styles.css' assert { type: 'css' }
import fetchBionic from '../lib/fetchBionic'
import { themeChanged } from '../lib/events'
import { SCHEMES } from '../lib/themes'

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
    const storedBionicTheme = window.localStorage.getItem(SCHEMES.bionic)

    if (storedBionicTheme === 'true') {
      this.toggleBionic(markup, 'true')
    }

    document.addEventListener('themeChanged', (event) => {
      if (event.detail.theme === 'bionic') {
        event.detail.element.setAttribute('value', event.detail.value)
        this.toggleBionic(markup, event.detail.value)
      }
    })

    this.shadowRoot.appendChild(markup)
  }

  toggleBionic(markup, active) {
    const bodyCopy = [...markup.querySelectorAll('[data-bionic]')]

    if (active === 'true') {
      const bodyCopyAsText = bodyCopy.map(item => item.innerText).join('|||')
      
      fetchBionic(bodyCopyAsText).then(result => {
        result.split('|||').forEach((item, index) => bodyCopy[index].innerHTML = item.replace(/(<br>)/g, ' '))
      })
    } else {
      bodyCopy.forEach((item, index) => bodyCopy[index].innerText = item.innerText)
    }
  }
}

export default Body
