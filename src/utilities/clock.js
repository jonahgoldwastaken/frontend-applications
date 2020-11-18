import { reduce } from 'ramda'

export { expandArrayOfNumbers }

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
