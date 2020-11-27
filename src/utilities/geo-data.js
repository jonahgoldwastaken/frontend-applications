import haversine from 'haversine'

export { isGeoDataPoint, calculateHaversine }

/**
 * Checks if GeoData is a Point or not
 *
 * @param {string[]} data Partially parsed GeoData string.
 * @returns {boolean}
 */
function isGeoDataPoint(data) {
  return data[0] === 'POINT'
}

/**
 * Calculates haversine from area to hotspot
 *
 * @param {object} area Area specified
 * @returns {(*) => *} Functiona that takes a hotspot and returns provided area with distances to hotspots
 */
function calculateHaversine(area) {
  return hotspot =>
    haversine(
      [area.coordinates.long, area.coordinates.lat],
      [+hotspot.long, +hotspot.lat],
      { format: '[lon,lat]' }
    ).toFixed(2)
}
