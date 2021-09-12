import { template } from '../lib/template'
import insertIntoDOM from '../lib/insertIntoDOM'
import styles from './styles.css'
import html from './markup.html'
import header from '/src/header/script'
import copy from '/src/copy/script'

function layout() {
  const markup = template(html, { styles })
  const head = header()
  const bodyRight = copy()
  const DOMwithLayout = insertIntoDOM(markup, [
    { selector: `.${styles.header}`, tree: head },
    { selector: `.${styles.bodyRight}`, tree: bodyRight },
  ])

  return DOMwithLayout
}

export default layout
