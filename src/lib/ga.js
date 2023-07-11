const gid = 'G-44PDK1F0BB'

function gtag() {
  window.dataLayer = window.dataLayer || []
  dataLayer.push(arguments)
}

function loadScript() {
  const script = document.createElement('script')
  script.async = true

  script.onload = () => {
    gtag('js', new Date())
  }

  script.onerror = () => {
    console.error('Could not load Google Analytics');
  }

  script.src = `https://www.googletagmanager.com/gtag/js?id=${gid}`
  document.head.appendChild(script)
}

export const ga = {
  page: () => {
    loadScript()
    gtag('config', gid)
  },
  track: (event, data = {}) => gtag('event', event, data)
}