import styles from './styles.css'
import html from './markup.html'
import logo from '../images/bsturd.html'
import user from '../images/user.html'
import { template } from '../lib/template'
import insertIntoDOM from '../lib/insertIntoDOM'
import { violet, pink } from '../colors/colors.css'
import { data } from './data'
import dropdown from './dropdown.html'
import dropdownItem from './item.html'

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

  target.append(dropdownNodes)
}

function header() {
  const markup = template(html, { styles })
  const logoSvg = template(logo, {})
  const userSvg = template(user, { styles })

  document.body.addEventListener(
    'click',
    (event) => {
      if (event.target.className === styles.user) {
        openDropdown(markup, event.target)
      }
    },
    true,
  )

  return insertIntoDOM(markup, [
    { selector: `.${styles.title}`, tree: logoSvg },
    { selector: `.${styles.icon}`, tree: userSvg },
  ])
}

export default header
