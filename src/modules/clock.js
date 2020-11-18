import { scaleLinear } from 'd3'

export { enterDots, updateDots, createClockScales }

/**
 * Enter function for D3 selection.join
 *
 * @param {number} dimension Dimension of graph
 * @param {*} line D3 Line Radial
 * @returns {(*) => *} Function that can be used inside .join
 */
function enterDots(line) {
  return selection =>
    selection
      .append('circle')
      .attr('transform', `translate(0px, 0px)`)
      .call(enter =>
        enter
          .transition()
          .duration(100)
          .attr(
            'transform',
            d => `translate(${line([d]).slice(1).slice(0, -1)})`
          )
      )
}

/**
 * Update function for D3 selection.join
 *
 * @param {*} line D3 Line Radial
 * @returns {(*) => *} Function that can be used inside .join
 */
function updateDots(line) {
  return selection =>
    selection.call(update =>
      update
        .transition()
        .duration(100)
        .attr('transform', d => `translate(${line([d]).slice(1).slice(0, -1)})`)
    )
}

function createClockScales(times, distances, radius) {
  return [
    scaleLinear().domain(times).range([0, 360]),
    scaleLinear().domain(distances).range([100, radius]),
  ]
}
