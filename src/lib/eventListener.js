export default function (
  { event = 'click', target, targetType = 'class' },
  callback,
) {
  if (!target) {
    return console.error('A target must be defined')
  }

  if (!callback || !callback instanceof Function) {
    return console.error('A callback function must be provided')
  }

  const type = {
    class: 'className',
    id: 'id',
    tag: 'tagName',
  }[targetType]

  document.body.addEventListener(
    event,
    (eventData) => {
      if (eventData.target[type].includes(target)) {
        callback(eventData)
      }
    },
    true,
  )
}
