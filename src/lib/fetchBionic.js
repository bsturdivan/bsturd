export default async function (content) {
  const url = 'https://bionic-reading1.p.rapidapi.com/convert';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '5f943e1666msh099f3f1ccefe0fcp1b6a69jsn78608bfb51be',
      'X-RapidAPI-Host': 'bionic-reading1.p.rapidapi.com'
    },
    body: new URLSearchParams({
      content,
      response_type: 'html',
      request_type: 'html',
      fixation: '4',
      saccade: '10'
    })
  }

  try {
    const response = await fetch(url, options)
    const result = await response.text()

    return result
  } catch (error) {
    return error
  }
}