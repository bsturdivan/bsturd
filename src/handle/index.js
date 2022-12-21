import logo from './handle.html'
import sheet from './styles.css' assert { type: 'css' }
import random from '../lib/Random'
import colors from '../colors/colors.css'

class Handle extends HTMLElement {
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
    const markup = parser.parseFromString(logo.trim(), 'text/html').body
      .firstChild

    markup.addEventListener('click', this.toggleSideNav, true)

    const glitch = markup.getElementsByClassName('glitch')[0]
    const glitchLeft = markup.getElementsByClassName('glitch--left')[0]
    const numbers = this.getInterval()
    const numbers2 = this.getInterval()
    const numbersX1 = this.getInterval()
    const numbersX2 = this.getInterval()

    setInterval(() => {
      glitch.style.clipPath =
        'polygon(0 28%, 98% 13%, 85% 90%, 100% 47%, 52% 87%, 100% 72%, 0 74%, 31% 100%, 0 44%, 65% 30%)'
    }, numbers)

    setInterval(() => {
      glitch.style.clipPath = ''
    }, numbers2)

    setInterval(() => {
      glitchLeft.style.transform = `translateX(${this.getXOffset()}px)`
    }, numbersX1)

    setInterval(() => {
      glitchLeft.style.transform = ''
    }, numbersX2)

    this.shadowRoot.appendChild(markup)
  }

  getInterval() {
    return random({ min: 200, max: 3000 })
  }

  getXOffset() {
    return random({ min: -2, max: 6 })
  }

  toggleSideNav(event) {
    const el = event.target

    if (el.dataset.toggle !== 'nav') {
      return false
    }

    const isOpen = JSON.parse(el.dataset.open)
    const menu = this.querySelector('.handle__container')
    el.dataset.open = !isOpen

    if (isOpen) {
      menu.classList.add('handle__container--hidden')
      el.style.color = colors.contrast
    } else {
      menu.classList.remove('handle__container--hidden')
      el.style.color = colors.base
    }
  }
}

export default Handle
