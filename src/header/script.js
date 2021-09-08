import styles from './styles.css'
import html from './markup.html'
import logo from '../images/bsturd.html'
import user from '../images/user.html'
import { template } from '../lib/template'
import insertIntoDOM from '../lib/insertIntoDOM'
import eventListener from '../lib/eventListener'
import { violet, pink } from '../colors/colors.css'
import { data } from './data'
import dropdown from './dropdown.html'
import dropdownItem from './item.html'

const ACTIVE_CLASS = styles['user--active']
let isOpen = false

function closeDropdown(target) {
  target.classList.remove(ACTIVE_CLASS)
  target.removeChild(target.querySelector(`.${styles.nav}`))
}

function openDropdown(markup, target) {
  const dropdownMarkup = template(dropdown, { styles })
  const parsedDropdown = insertIntoDOM(markup, [
    { selector: `.${styles.buttonContainer}`, tree: dropdownMarkup },
  ])
  const dataToDOM = data.map((item) => {
    const parsedItem = template(dropdownItem, { styles, item })
    return { selector: `.${styles.list}`, tree: parsedItem }
  })

  const dropdownNodes = insertIntoDOM(dropdownMarkup, dataToDOM)

  target.classList.add(ACTIVE_CLASS)
  target.append(dropdownNodes)
}

function toggleDropdown(markup, target) {
  if (isOpen) {
    isOpen = false
    closeDropdown(target)
  } else {
    isOpen = true
    openDropdown(markup, target)
  }
}

function header() {
  const markup = template(html, { styles })
  const logoSvg = template(logo, {})
  const userSvg = template(user, { styles })

  eventListener({ event: 'click', target: styles.user }, (event) =>
    toggleDropdown(markup, event.target),
  )

  return insertIntoDOM(markup, [
    { selector: `.${styles.title}`, tree: logoSvg },
    { selector: `.${styles.icon}`, tree: userSvg },
  ])
}

export default header
