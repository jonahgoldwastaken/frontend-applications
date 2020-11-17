export { removeFromString, splitStringOn }

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
