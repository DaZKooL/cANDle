// Gets and object with the current / last form responses

function lastResponseLogger(response) {
  const responses = response.reduce((acc, cur) => {
    const key = cur.getItem().getTitle()
    const val = cur.getResponse()
    return {[key]: val, ...acc}
  }, {})

  // console.log('Responses: ', responses)
  return responses
}