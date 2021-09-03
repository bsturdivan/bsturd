function parseObject(template, data) {
  return new Function('obj', `return obj.${template}`)(data)
}

function htmlStringParse(match, data) {
  const regFunctions = /((if|map|else|{|}))(.*)?/g

  return Function(
    'parseObject',
    'data',
    'template',
    `return parseObject(template, data)`
  )(parseObject, data, match)
}

export function template(html, data) {
  const parser = new DOMParser()
  const reg = /(?<=\${)(.*?)(?=\})/g
  const lookarounds = /\${(?=(.*?)(?=\}))|(?<=(?<=\${)(.*?))\}/g

  const parsedHtml = html.replaceAll(reg, match => {
    return htmlStringParse(match, data)
  }).replaceAll(lookarounds, '')

  return parser.parseFromString(parsedHtml, "text/html").body.children[0]
}
