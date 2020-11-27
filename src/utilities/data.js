export { fetchData, parseResToJSON, storeData, retrieveLocalData }

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

/**
 * Takes a data array, and saves it to localStorage or cookie
 *
 * @param {object[]} data Data array
 * @returns {boolean}
 */
function storeData(data) {
  const dataString = JSON.stringify(data)
  try {
    localStorage.setItem('data', dataString)
    return true
  } catch {
    try {
      document.cookie = `data=${dataString}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
      return true
    } catch {
      return false
    }
  }
}

/**
 * Retrieves the data from localStorage
 *
 * @returns {object[]|null} The data from localStorage or cookies or nothing if there is none
 */
function retrieveLocalData() {
  try {
    const localStorageData = JSON.parse(localStorage.getItem('data'))
    if (localStorageData && localStorageData.length) return localStorageData
    const cookieData = JSON.parse(document.cookie.split(';')[0].split('=')[1])
    if (cookieData && cookieData.length) return cookieData
    return null
  } catch {
    return null
  }
}
