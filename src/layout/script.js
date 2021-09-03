import { template } from '../lib/template'
import insertIntoDOM from '../lib/insertIntoDOM'
import styles from './styles.css'
import html from './markup.html'
import header from '/src/header/script'

function layout() {
  const markup = template(html, { styles })
  const head = header()
  const DOMwithLayout = insertIntoDOM(markup, [
    { selector: `.${styles.header}`, tree: head },
  ])

  return DOMwithLayout
}

export default layout
