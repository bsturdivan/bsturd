import './globals/index.css'
import layout from './layout/script.js'

function component() {
  const element = document.createElement('div')
  element.setAttribute('id', 'bsturd')
  const layoutTree = layout()

  element.appendChild(layoutTree)

  return element
}

document.body.appendChild(component())
