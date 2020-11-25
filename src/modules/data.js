import {
  always,
  andThen,
  assoc,
  both,
  find,
  has,
  ifElse,
  isNil,
  lensProp,
  map,
  mergeRight,
  otherwise,
  pick,
  pipe,
  project,
  prop,
  propEq,
  set,
  zipObj,
} from 'ramda'
import { renameKeys } from 'ramda-adjunct'
import { uri } from '../config/data'
import { fetchData, parseResToJSON } from '../utilities/data.js'
import { calculateHaversine } from '../utilities/geo-data'
import { parseGeoData } from './geo-data.js'
import hotspots from './hotspots.json'

export { parseRDWData }

async function parseRDWData() {
  return pipe(fetchAndParseMultipleJSON, andThen(parkingAreaMapper))(uri)
}

function fetchAndParseMultipleJSON(uri) {
  return pipe(map(fetchAndParseJSON), Promise.all.bind(Promise))(uri)
}

function fetchAndParseJSON(url) {
  return pipe(fetchData, otherwise(console.log), andThen(parseResToJSON))(url)
}

const parkingAreaLookupTable = {
  areaid: 'id',
  areadesc: 'description',
}

function parkingAreaMapper(data) {
  return pipe(
    map(
      pipe(
        combineDataSet(data[1]),
        combineDataSet(data[2]),
        combineDataSet(data[3]),
        renameKeys(parkingAreaLookupTable)
      )
    ),
    map(val =>
      pipe(
        assoc('coordinates', parseCoordinates(val)),
        assoc('openingHours', parseParkingEntrance(val))
      )(val)
    ),
    map(val =>
      pipe(
        assoc('distanceToHotspot', associateDistancesToHotspots(hotspots, val)),
        mapAddOpeningHoursAsKeyToArea
      )(val)
    ),
    project([
      'id',
      'description',
      'capacity',
      'openingHours',
      'coordinates',
      'distanceToHotspot',
    ]),
    map(parseInvalidValues)
  )(data[0])
}

function combineDataSet(data) {
  return area =>
    pipe(find(propEq('areaid', area.areaid)), mergeRight(area))(data)
}

function parseCoordinates(area) {
  return pipe(
    ifElse(
      has('areageometryastext'),
      parseGeoData,
      always({ long: Infinity, lat: Infinity })
    )
  )(area)
}

function parseParkingEntrance(area) {
  return pipe(
    ifElse(
      both(has('enterfrom'), has('enteruntil')),
      pipe(
        pick(['enterfrom', 'enteruntil']),
        Object.values,
        map(parseOpeningHourStrings)
      ),
      always([null, null])
    )
  )(area)
}

function associateDistancesToHotspots(hotspots, area) {
  return pipe(
    map(calculateHaversine(area)),
    zipObj(pipe(project(['name']), map(prop('name')))(hotspots))
  )(hotspots)
}

function parseOpeningHourStrings(time) {
  const numbers = time.split('')
  return numbers.length > 3
    ? Number(numbers[0] + numbers[1]) + Number(numbers[2] + numbers[3]) / 60
    : numbers.length === 1
    ? +numbers[0]
    : +numbers[0] + Number(numbers[1] + numbers[2]) / 60
}

function mapAddOpeningHoursAsKeyToArea(area) {
  return area.openingHours[0]
    ? area
    : 'description' in area
    ? area.description.match(/\d{2}-\d{2}/)
      ? {
          ...area,
          openingHours: [
            +area.description.match(/\d{2}-\d{2}/)[0].split('-')[0],
            +area.description.match(/\d{2}-\d{2}/)[0].split('-')[1],
          ],
        }
      : {
          ...area,
          openingHours: [null, null],
        }
    : area
}

function parseInvalidValues(area) {
  const capacity = isNil(area.capacity) ? 0 : +area.capacity
  return pipe(set(lensProp('capacity'), capacity))(area)
}
