import {
  add,
  equals,
  gt,
  ifElse,
  length,
  map,
  pipe,
  reduce,
  tail,
  zipObj,
} from 'ramda'
import { divideNum } from 'ramda-adjunct'
import { isGeoDataPoint } from '../utilities/geo-data'
import { removeFromString, splitStringOn } from '../utilities/string'

export { parseGeoData }

function parseGeoData({ areageometryastext }) {
  return pipe(
    splitStringOn(' '),
    map(
      pipe(
        removeFromString(/\(/g),
        removeFromString(/\)/g),
        removeFromString(/,/g)
      )
    ),
    ifElse(isGeoDataPoint, parseGeoPoint, parseGeoPolygon)
  )(areageometryastext)
}

function parseGeoPoint(pointData) {
  return pipe(tail, map(Number), zipObj(['long', 'lat']))(pointData)
}

function parseGeoPolygon(polygonData) {
  return pipe(
    tail,
    map(Number),
    reduce(
      ([long, lat], curr) => [
        equals(long.length, lat.length) ? [...long, curr] : [...long],
        gt(long.length, lat.length) ? [...lat, curr] : [...lat],
      ],
      [[], []]
    ),
    map(val => divideNum(length(val), reduce(add, 0, val))),
    zipObj(['long', 'lat'])
  )(polygonData)
}
