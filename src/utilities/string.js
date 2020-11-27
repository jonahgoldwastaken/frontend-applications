export { removeFromString, splitStringOn, timeFormatter }

/**
 * Removes everything from string that matches regular expression
 *
 * @param {string|RegExp} remover Regular exprssion or string that will be removed from full string
 * @returns {(string) => string}
 */
function removeFromString(remover) {
  return str => str.replace(remover, '')
}

/**
 * Splits string on the value of provided split string
 *
 * @param {string|RegExp} splitter String or regular expression containing value to split string on
 * @returns {(string) => string[]} Function that takes a string and splits it on provided string
 */
function splitStringOn(splitter) {
  return str => str.slice().split(splitter)
}

/**
 * Formats a string to a nice Time format
 * @param {string} str String to format
 * @returns {string} Formatted string
 */
function timeFormatter(str, long) {
  return long
    ? `${str < 10 ? `0${str}` : str === 24 ? '00' : str}:${
        str % 1 ? (str % 1) * 60 : '00'
      }`
    : str === 24
    ? '12AM'
    : str > 12
    ? `${str - 12}PM`
    : str === 12
    ? '12PM'
    : str === 0
    ? '12AM'
    : `${str}AM`
}
