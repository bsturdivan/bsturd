import { data } from './data'
import html from './markup.html'
import paragraph from './paragraph.html'
import { template } from '../lib/template'
import insertIntoDOM from '../lib/insertIntoDOM'
import styles from './styles.css'
import Hub from '../lib/hub'
import Markov from 'markov-strings'

let paragrphLength = 0
let charLength = []

function addGlitch(interval, characterClass, addedClass) {
  document.querySelector(characterClass)?.classList.add(addedClass)

  const timer = setTimeout(() => {
    removeGlitch(characterClass, addedClass)
    clearTimeout(timer)
  }, interval + 400)
}

function removeGlitch(characterClass, addedClass) {
  document.querySelector(characterClass)?.classList.remove(addedClass)
}

function handleIntersect(entries, observer) {
  const paragraphIndex = paragrphLength - 1
  debugger

  const markov = new Markov({ stateSize: paragrphLength - 1 })

  observer.unobserve(entries[0].target)
}

function createObserver() {
  let observer
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.05,
  }

  observer = new IntersectionObserver(handleIntersect, options)
  document
    .querySelectorAll(`.${styles.body}`)
    .forEach((item) => observer.observe(item))
}

function onLoadActions() {
  const minInt = 50
  const maxInt = 200
  const maxPar = paragrphLength
  let interval = minInt
  const minParInt = 1000
  const maxParInt = 3000
  let paragraphInt = minParInt

  window.setInterval(() => {
    interval = Math.random() * (maxInt - minInt) + minInt
    const paragraphNumber = Math.floor(Math.random() * (maxPar - 0) + 0)
    const maxChar = charLength[paragraphNumber]
    const characterNumber = Math.floor(Math.random() * (maxChar - 0) + 0)
    addGlitch(
      interval,
      `.a${paragraphNumber - 1}-${characterNumber - 1}`,
      styles.glitch,
    )
  }, interval)

  window.setInterval(() => {
    paragraphInt = Math.random() * (maxParInt - minParInt) + minParInt
    const paragraphNumber = Math.floor(Math.random() * (maxPar - 0) + 0)
    addGlitch(paragraphInt, `.p${paragraphNumber - 1}`, styles.paragraphGlitch)
  }, paragraphInt)

  createObserver()
}

function copy() {
  const markup = template(html, { styles })
  paragrphLength = data.length

  const dataToDOM = data.map((item, index) => {
    const charArray = item.split('')
    charLength = [charArray.length, ...charLength]
    const joinedText = charArray
      .map((char, index2) => `<span class="a${index}-${index2}">${char}</span>`)
      .join('')
    const paragraphText = template(paragraph, {
      styles,
      data: { text: joinedText, index },
    })
    return { selector: `.${styles.section}`, tree: paragraphText }
  })

  const newDOM = insertIntoDOM(markup, dataToDOM)

  Hub.sub('load', onLoadActions)

  return newDOM
}

export default copy
