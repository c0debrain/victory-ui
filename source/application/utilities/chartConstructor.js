/**
 * Takes in a series of graph lines as an argument, and allows you to overwrite
 * the existing styling for a series. This establishes a default style for
 * charts but allows you the autonomy to customize them.
 *
 * @param  {[array]}    series  array of overwriting arguments
 * @return {[object]}   chart   configuration
 */
export default configuration => ({
    chart: {
        animation: true,
        type: 'area',
        spacingLeft: 0,
        spacingRight: 0,
        spacingTop: 0,
        style: {
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '12px'
        }
    },
    tooltip: {
        style: {
            padding: 15,
            fontWeight: 'bold'
        }
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    title: {
        text: null
    },
    xAxis: {
        categories: [],
        crosshair: {
            color: '#e5e5e5',
            width: 2,
            zIndex: 2,
            dashStyle: 'shortdash'
        },
        startOnTick: false,
        endOnTick: false,
        gridLineWidth: 0,
        minPadding: 0,
        maxPadding: 0,
        tickLength: 0
    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            align: 'left',
            x: 10,
            y: -8
        },
        startOnTick: false,
        endOnTick: false,
        softMax: 100,
        softMin: 0
    },
    series: configuration.series.map(entry => Object.assign({
        name: 'Series',
        data: [],
        type: 'area',
        color: '#2099ea',
        lineWidth: 1,
        dashStyle: 'longdash',
        fillOpacity: 0.08,
        marker: {
            fillColor: '#FFF',
            lineColor: null,
            lineWidth: 1.5,
            width: 6,
            height: 6,
            radius: 3,
            symbol: 'circle'
        }
    }, entry)) || []
})
