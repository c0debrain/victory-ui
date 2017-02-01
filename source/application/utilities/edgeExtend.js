/**
 * Extends the edges of the graph beyond the immediate view, making the chart
 * line look like it continues in both directions. This is purely aesthetic.
 *
 * @param  {object} chart chart that is to be modified
 */
export default (chart) => {
    chart.series.forEach((series) => {
        // Get inner-chart box
        const box = chart.plotBox

        // Take areas path
        const areaPath = series.areaPath

        // Add start point
        // Right after the first element (M)
        areaPath.splice(1, 0, 0, areaPath[2], 'L')

        // Add Last points upper area end
        // Remove penultimate point
        // Replace it with a new point reaching to the width of chart and growing to the height of last element
        // And add the bottom-right corner
        areaPath.splice(-6, 3, 'L', box.width, areaPath[areaPath.length - 7], 'L', box.width, box.height)

        // Make the last points X be zero - that will result in bottom left corner
        areaPath[areaPath.length - 2] = 0

        // Replace value (redraw)
        series.area.element.attributes.d.value = areaPath.join(' ')
        const graphPath = series.graphPath

        // Add start point
        // Right after the first element (M)
        graphPath.splice(1, 0, 0, graphPath[2], 'L')

        // Add end point
        graphPath.push('L', box.width, graphPath[graphPath.length - 1])
        series.graph.element.attributes.d.value = graphPath.join(' ')
    })
}
