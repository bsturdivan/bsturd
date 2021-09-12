function extractTree(parentNode, selector, tree) {
  let markup

  if (tree instanceof HTMLElement || tree.children.length > 0) {
    markup = tree
  } else if (tree instanceof Function) {
    markup = tree()
  } else {
    return console.error(`${tree} must be an HTMLElement or a Function`)
  }

  const insertionPoint = parentNode.querySelector(selector) || parentNode
  insertionPoint.append(tree)
}

export default function insertIntoDOM(parent, insertionArray) {
  if (!insertionArray || insertionArray.length === 0) {
    return console.error(`${parent} needs elements to attach`)
  }

  if (!parent || !parent instanceof HTMLElement) {
    return console.error(`${parent} must be an HTMLElement`)
  }

  const parentNode = parent.cloneNode(true)
  const fragment = document.createDocumentFragment()

  insertionArray.forEach(({ selector, tree }) => {
    extractTree(parentNode, selector, tree)
  })

  fragment.appendChild(parentNode)

  return fragment
}
