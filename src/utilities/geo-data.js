export { isGeoDataPoint }

/**
 * Checks if GeoData is a Point or not
 *
 * @param {string[]} data Partially parsed GeoData string.
 * @returns {boolean}
 */
function isGeoDataPoint(data) {
  return data[0] === 'POINT'
}
