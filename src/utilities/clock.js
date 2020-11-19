import { reduce } from 'ramda'

export {
  expandArrayOfNumbers,
  filterOnDistanceToHotspot,
  filterOnOpeningHours,
  filterDataWithValidHours,
}

/**
 * Maps out all whole numbers between two numbers over array
 *
 * @param {[number, number]} times Array with two numbers
 * @returns {number[]} Mapped array
 */
function expandArrayOfNumbers(times) {
  return reduce(
    (acc, curr) =>
      acc.length === 1
        ? acc.concat(
            [...new Array(times[1] - times[0] - 1)].map(
              (_, i) => i + 1 + acc[0]
            )
          )
        : [curr],
    []
  )(times)
}

/**
 * Checks if distance of area is lower than provided max distance.
 *
 * @param {number[]} distances Array with distances.
 * @param {string} hotsopt Name of hotspot.
 * @returns {(object) => boolean} Function that checks if distance to hotspot is lower than max distance.
 */
function filterOnDistanceToHotspot(distances, hotspot) {
  return area =>
    area.distanceToHotspot[hotspot] > distances[0] &&
    area.distanceToHotspot[hotspot] < distances[1]
}

/**
 * Checks if openingHours is in between provided time and time type.
 *
 * @param {[number, number]} times Array with min and max times.
 * @param {string} timeType Current used time type (opening or closing)
 * @returns {(object) => boolean} Function that checks if this is true.
 */
function filterOnOpeningHours(times, timeType) {
  return area =>
    area.openingHours[0] !== null
      ? timeType === 'opening'
        ? area.openingHours[0] >= times[0] && area.openingHours[0] < times[1]
        : area.openingHours[1] >= times[0] && area.openingHours[1] < times[1]
      : true
}

/**
 * Filters areas on if they have valid opening hours data
 * @param {object} area Area to filter
 * @returns {boolean}
 */
function filterDataWithValidHours(area) {
  return area.openingHours[0] !== null
}
