//Initiate white background
Chart.plugins.register({
    beforeDraw: function(chartInstance) {
        var ctx = chartInstance.chart.ctx;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
    }
});

// The first chart on the page
TCVIZ.Charts.Ridership = function(elementId) {

    this.update = function(chartTitle, datasets) {
        datasets[0] = _.extend({}, this.yLeftDefaults, datasets[0]);
        var scales = [this.yScaleLeft];
        if (datasets.length > 1) {
            datasets[1] = _.extend({}, this.yRightDefaults, datasets[1]);
            scales.push(this.yScaleRight);
        }
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: datasets
            },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 5,
                        right: 5
                    }
                },
                legend:  {
                    position: 'bottom'
                },
                scales: {
                    yAxes: scales
                },
                title: {
                    display: true,
                    text: chartTitle
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }

                            var valueFormatter = tooltipItem.datasetIndex === 0 ?
                                TCVIZ.Charts.Formatters.totalRidership :
                                TCVIZ.Charts.Formatters.number;
                            label += valueFormatter(tooltipItem.yLabel);
                            return label;
                        }
                    }
                }
            }
        });
    };

    this.yScaleLeft = {
        position: 'left',
        'id': 'y-axis-left',
        scaleLabel: {
            display: true,
            labelString: 'Total Ridership (millions)'
        },
        ticks: {
            callback: TCVIZ.Charts.Formatters.totalRidership
        }
    };
    this.yScaleRight = {
        position: 'right',
        'id': 'y-axis-right',
        ticks: {
            callback: TCVIZ.Charts.Formatters.number
        }
    };
    this.labels = _.range(2006, 2016);
    this.yLeftDefaults = {
        borderColor: '#3165f0',
        fill: false,
        yAxisID: 'y-axis-left'
    };
    this.yRightDefaults = {
        borderColor: '#f03365',
        fill: false,
        yAxisID: 'y-axis-right'
    };

    this.ctx = document.getElementById(elementId).getContext('2d');
    this.chart = null;
};
