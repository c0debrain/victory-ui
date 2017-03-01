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
        },
        zoomType: 'x'
    },
    tooltip: {
        style: {
            padding: 15,
            fontWeight: 'bold'
        }
    },
    rangeSelector: {
        enabled: false,
        buttons: [{
            type: 'day',
            count: 3,
            text: '3d'
        }, {
            type: 'week',
            count: 1,
            text: '1w'
        }, {
            type: 'month',
            count: 1,
            text: '1m'
        }, {
            type: 'month',
            count: 6,
            text: '6m'
        }, {
            type: 'year',
            count: 1,
            text: '1y'
        }, {
            type: 'all',
            text: 'All'
        }],
        selected: 3
    },
    scrollbar: {
        enabled: true
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
        crosshair: {
            color: '#e5e5e5',
            width: 2,
            zIndex: 2,
            dashStyle: 'shortdash'
        },
        type: 'datetime',
        dateTimeLabelFormats: {
            millisecond: '%I:%M:%S.%L %p',
            second: '%I:%M:%S %p',
            minute: '%I:%M %p',
            hour: '%I:%M %p',
            day: '%e. %b',
            week: '%e. %b',
            month: '%b \'%y',
            year: '%Y'
        },
        startOnTick: false,
        endOnTick: false,
        gridLineWidth: 0,
        minPadding: 0,
        maxPadding: 0,
        tickLength: 0
    },
    yAxis: {
        labels: {
            format: '{value}%'
        },
        offset: -5,
        gridlineWidth: 1,
        gridLineColor: '#d8e2e7'
        // plotLines: [{
        //     value: 80,
        //     color: '#FFDF6D',
        //     dashStyle: 'shortdash',
        //     width: 2
        // }, {
        //     value: 95,
        //     color: '#FFA2AD',
        //     dashStyle: 'shortdash',
        //     width: 2
        // }]
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
