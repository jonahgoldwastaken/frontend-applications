export { fetchData, parseResToJSON, localStorageIsSupported }

/**
 * Fetches data from url
 * @param {string} url Url to fetch data from
 */
function fetchData(url) {
  return fetch(url)
}

/**
 * Parses Fetch response to JSON
 * @param {Response} res Fetch response to parse to json
 */
function parseResToJSON(res) {
  return res.json()
}

function localStorageIsSupported() {
  try {
    const test = 'test'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
