import logo from './logo.html'
import sheet from './styles.css' assert { type: 'css' }
import random from '../lib/Random'

class Logo extends HTMLElement {
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

    const flickerArray = markup.getElementsByClassName('logo--pink')
    const flickerArray2 = markup.getElementsByClassName('logo__main')[0]
    const numbers = this.getInterval()
    const numbers2 = this.getInterval()

    for (let i = 0; i < flickerArray.length; i++) {
      setInterval(() => {
        flickerArray[i].style.transform = this.setOffet()
      }, numbers[i])
    }

    for (let i = 0; i < flickerArray.length; i++) {
      setInterval(() => {
        flickerArray[i].style.transform = ''
      }, numbers2[i])
    }

    setInterval(() => {
      flickerArray2.style.clipPath =
        'polygon(99% 1%, 69% 0, 49% 0, 100% 20%, 53% 100%, 100% 64%, 30% 91%, 0% 70%, 0 0, 30% 8%)'
      flickerArray2.style.transform = this.setLeftOffset()
    }, 4000)

    setInterval(() => {
      flickerArray2.style.clipPath = ''
      flickerArray2.style.transform = ''
    }, 4100)

    this.shadowRoot.appendChild(markup)
  }

  setOffet() {
    const offsetX = random({ min: -4, max: 4, floor: false })
    const offsetY = random({ min: -0.5, max: 0.5, floor: false })
    return `skew(${offsetX}deg, ${offsetY}deg)`
  }

  setLeftOffset() {
    const offsetX = random({ min: -6, max: 3, floor: false })
    return `translateX(${offsetX}px)`
  }

  getInterval() {
    let numbers = []

    for (let i = 0; i < 4; i++) {
      numbers.push(random({ min: 500, max: 2000 }))
    }

    return numbers
  }
}

export default Logo
