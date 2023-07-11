import './globals'
import './sitemap.xml'
import Layout from './layout'

window.customElements.define('bsturd-layout', Layout)

const bsturd = document.createElement('div')
const layout = document.createElement('bsturd-layout')
bsturd.setAttribute('id', 'bsturd')
bsturd.appendChild(layout)

document.body.appendChild(bsturd)
