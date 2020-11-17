export { fetchData, parseResToJSON }

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
