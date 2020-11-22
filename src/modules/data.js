import {
  always,
  andThen,
  assoc,
  filter,
  find,
  ifElse,
  isNil,
  map,
  omit,
  otherwise,
  pick,
  pipe,
  project,
  prop,
  propEq,
  values,
  zipObj,
} from 'ramda'
import { renameKeys } from 'ramda-adjunct'
import hotspots from './hotspots.json'
import { uri } from '../config/data'
import { unwrapArrayValueAtIndex } from '../utilities/array'
import { fetchData, parseResToJSON } from '../utilities/data.js'
import { calculateHaversine } from '../utilities/geo-data'
import { parseGeoData } from './geo-data.js'

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
    map(val =>
      pipe(
        renameKeys(parkingAreaLookupTable),
        omit(['startdatearea', 'enddatearea', 'usageid', 'areamanagerid']),
        assoc('usage', associateUsageGoal(data[1], val)),
        assoc('capacity', associateSpecifications(data[2], val)),
        assoc('coordinates', associateCoordinates(data[3], val)),
        assoc('openingHours', associateParkingEntrance(data[4], val))
      )(val)
    ),
    map(val =>
      assoc(
        'distanceToHotspot',
        associateDistancesToHotspots(hotspots, val)
      )(val)
    ),
    map(mapAddOpeningHoursAsKeyToArea),
    filter(filterInvalidCoordinates)
  )(data[0])
}

function associateUsageGoal(goals, area) {
  return pipe(
    find(propEq('usageid', area.usageid)),
    ifElse(
      isNil,
      always('Heeft geen gebruiksdoel'),
      pipe(pick(['usageiddesc']), values, unwrapArrayValueAtIndex(0))
    )
  )(goals)
}

function associateSpecifications(specs, area) {
  return pipe(
    find(propEq('areaid', area.areaid)),
    ifElse(
      isNil,
      always(0),
      prop('capacity'),
      unwrapArrayValueAtIndex(0),
      Number
    )
  )(specs)
}

function associateCoordinates(geoData, area) {
  return pipe(
    find(propEq('areaid', area.areaid)),
    ifElse(
      isNil,
      always({ long: Infinity, lat: Infinity }),
      pipe(
        pick(['areageometryastext']),
        values,
        unwrapArrayValueAtIndex(0),
        parseGeoData
      )
    )
  )(geoData)
}

function associateParkingEntrance(entrance, area) {
  return pipe(
    find(propEq('areaid', area.areaid)),
    ifElse(
      isNil,
      always([null, null]),
      pipe(pick(['enterfrom', 'enteruntil']), Object.values)
    )
  )(entrance)
}

function associateDistancesToHotspots(hotspots, area) {
  return pipe(
    map(calculateHaversine(area)),
    zipObj(pipe(project(['name']), map(prop('name')))(hotspots))
  )(hotspots)
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

function filterInvalidCoordinates(area) {
  return area.coordinates.long != Infinity
}
