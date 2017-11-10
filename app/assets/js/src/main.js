/* global L */

// TODO: should these be in a config file?
var map = L.map('map', {
    center: TCVIZ.Config.map.center,
    zoom: TCVIZ.Config.map.zoom
});

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
}).addTo(map);

$(document).ready(function() {
    var layerToggle = null;
    var msaToggle = null;
    var ridershipChartToggle = null;
    var featureGroup = null;

    /*
     Initialize objects
     */
    // Carto connections
    TCVIZ.Connections.msaMap = new TCVIZ.Carto.SQL('msaMap');
    TCVIZ.Connections.chartSql = new TCVIZ.Carto.ChartSQL('msa_yearly_transit_vars', TCVIZ.Config.SQL);
    TCVIZ.Connections.tractMap = new TCVIZ.Carto.SQL('censusTracts');

    // Init charts
    _.extend(Chart.defaults.global.tooltips, {
        mode: 'nearest',
        backgroundColor: '#f4f5f7',
        titleFontColor: '#000',
        bodyFontColor: '#000',
        borderColor: '#000',
        borderWidth: 2,
        xPadding: 10,
        yPadding: 10,
        titleMarginBottom: 10
    });
    _.extend(Chart.defaults.global.defaultFontFamily = 'Mark');
    var ridershipChart = new TCVIZ.Charts.Ridership('time-series-1');
    var changeChart = new TCVIZ.Charts.Change('time-series-2');

    TCVIZ.Templates = {
        msaPopup: _.template($('#msa-popup-tmpl').html()),
        tractPopup: _.template($('#tract-popup-tmpl').html()),
        legend: _.template($('#ramp-legend-tmpl').html()),
        legendCircle: _.template($('#circle-legend-tmpl').html()),
    };

    /*
    Initialize
     */
    initialize();

    /*
    Listeners
     */
    layerToggle.on('change', function() {
        setMap(msaToggle.getValue(), layerToggle.getValue());
    });
    msaToggle.on('change', function() {
        var msaId = msaToggle.getValue();

        // Updates layer toggle which triggers map layer updates
        updateMapDropdown();

        setRidershipChart(
            msaId,
            TCVIZ.Config.ridershipChartLeftAxisDefault,
            ridershipChartToggle.getValue());
        setChangeChart(msaId);

        // Auto zoom map to selected MSA, or zoom out if National Average selected
        if (isNationWide()) {
            map.setView(TCVIZ.Config.map.center, TCVIZ.Config.map.zoom);
        } else {
            TCVIZ.Connections.msaMap.getBBoxForMSA(msaId).done(function(bbox) {
                map.fitBounds(bbox);
            });
        }
    });
    ridershipChartToggle.on('change', function(value) {
        var msaId = msaToggle.getValue();
        var yAxisRightVariable = value;
        setRidershipChart(msaId, TCVIZ.Config.ridershipChartLeftAxisDefault, yAxisRightVariable);
    });

    // Listen for button zoom clicks from MSA popups in order to zoom
    // to their extent.
    $('body').on('click', '#msa-popup-zoom', function(e) {
        var msaId = $(e.target).data('name').toString(),
            msaOption = _.findWhere(TCVIZ.Config.MSA_list, { value: msaId });

        // Set the msa dropdown to the currently selected msa
        // bounds update triggered by selectize 'change' event
        msaToggle.setValue(msaOption.value);
    });

    $('body').on('click', '#tract-popup-zoom', function() {
        // Toggle change handles map zoom
        msaToggle.setValue(TCVIZ.Config.defaultMSA);
    });

    /*
    Functions--------------------------------------------------------------
     */

    /**
     * Change layer selector options when zoom level changes
     * @param  {Selector}
     * @param  {Array}
     */
    function changeToggle(select, layer_options) {
        select.clear(true);     // Do not fire change event when cleared
        select.clearOptions();
        select.addOption(layer_options);
    }

    /**
     * Find which quintile bucket a value falls into
     * @param  {object} feature  One object in featuregroug
     * @param  {string} variable Variable being mapped
     * @param  {array}  limits   Array of quintile breaks in cont. var
     * @return {integer}         Integer 0-4 bucket that the value falls into
     */
    function getBucket(feature, variable, breaks) {
        var v = feature.properties[variable];
        for (var i = breaks.length; i >= 0; i--) {
            if (v >= breaks[i]) {
                return i;
            }
            if (v <= breaks[0]) {
                return 0;
            }
        }
    }

    /**
     * Get breaks of a variable
     * @param  {GeoJSON} featureGroup Returned from SQL query
     * @param  {string}  variable     Variable being mapped
     * @return {array}                An array of quintile breaks for this variable
     */
    function getBreaks(featureGroup, variable, n) {
        var varArray = _.map(featureGroup.features,
            function(x) {
                return x.properties[variable];
            });
        var theBreaks = chroma.limits(varArray, 'q', n);
        return theBreaks;
    }

    /**
     * Initialize app
     */
    function initialize() {

        /**
         * All initialize functions
         */
        setUpSelectize();
        setUpEventListeners();
        updateMapDropdown();

        setMap(TCVIZ.Config.defaultMSA, TCVIZ.Config.defaultNtdField);
        setLegend(TCVIZ.Config.defaultNtdField);
        setChangeChart(TCVIZ.Config.defaultMSA);
        setRidershipChart(
            msaToggle.getValue(),
            TCVIZ.Config.ridershipChartLeftAxisDefault,
            ridershipChartToggle.getValue());

        function setUpEventListeners() {
            setUpSidebarToggle();
        }

        function setUpSelectize() {
            var defaults = {
                create: true
            };
            // Layer select
            $('#toggle').selectize(_.extend({}, defaults, {
                options: TCVIZ.Config.nationwide_layers
            }));
            layerToggle = $('#toggle')[0].selectize;

            // MSA select
            $('#MSA_toggle').selectize(_.extend({}, defaults, {
                options: TCVIZ.Config.MSA_list
            }));
            msaToggle = $('#MSA_toggle')[0].selectize;
            msaToggle.setValue(TCVIZ.Config.defaultMSA);

            // Ridership chart select
            var nationwide = _.map(TCVIZ.Config.nationwide_layers, function(layer) {
                return _.extend({}, layer, {group: 'nationwide'});
            });
            var msa = _.map(TCVIZ.Config.MSA_layers, function(layer) {
                return _.extend({}, layer, {group: 'msa'});
            });
            $('#selectize-ridership-chart').selectize(_.extend({}, defaults, {
                options: nationwide.concat(msa),
                optgroupField: 'group',
                valueField: 'absoluteValue',
                labelField: 'id',
                optgroups: [
                    {value: 'nationwide', label: 'Ridership'},
                    {value: 'msa', label: 'Census'}
                ]
            }));
            ridershipChartToggle = $('#selectize-ridership-chart')[0].selectize;
        }

        function setUpSidebarToggle() {
            $('#sidebar-toggle').on('click', function(el) {
                el.preventDefault();
                $('.sidebar').toggleClass('active');
            });
        }
    }

    /**
     * Remove objects with an NA value for a particular key
     */
    function removeNAs(geoJson, field) {
        geoJson.features = _.filter(geoJson.features, function(d) {
            return d.properties[field] != 'NA';
        });
        return geoJson;
    }

    /**
     * Send a layer to the map calling function based on map zoom
     */
    function setMap(msaId, layerId) {
        if (isNationWide()) {
            setNationalGeoJSONLayer(layerId);
        } else {
            setMSAGeoJSONLayer(msaId, layerId);
        }
    }

    function setLegend(layerId) {
        var style = isNationWide() ? 'symbol_style' : 'polygon_style',
            layerConfig = TCVIZ.Config[style][layerId];

        // Symbology may not have been defined
        if (!layerConfig) {
            $('#legend-inner').html('');
            return;
        }

        if (isNationWide()) {
            var circleCtx = {
                    layerName: '2015: ' + nationalLabelForKey(layerId, 'id'),
                    lowVal: _.first(TCVIZ.State.sizeBreaks),
                    highVal: _.last(TCVIZ.State.sizeBreaks),
                },
                breakCtx = _.assign(layerConfig, {
                    layerName: nationalLabelForKey(layerId, 'text'),
                });

            $('#legend-inner').html(TCVIZ.Templates.legend(breakCtx));
            if (TCVIZ.State.sizeBreaks) {
                $('#legend-circle-inner').html(TCVIZ.Templates.legendCircle(circleCtx));
            }
        } else {
            var useLayerConfig = true;
            var ctx = _.assign(layerConfig, {
                layerName: msaLabelForId(layerId, useLayerConfig),
            });

            $('#legend-inner').html(TCVIZ.Templates.legend(ctx));
            $('#legend-circle-inner').html('');
        }

    }

    function renderFormat(renderer, val) {
        if (val === null || val === undefined) { return 'Not Available'; }

        switch (renderer) {
        case 'percent':
            return val.toFixed(1) + '%';
        case 'number':
            return val.toLocaleString();
        case 'money':
            return '$ ' + val.toLocaleString();
        default:
            return val;
        }
    }

    /**
     * Set polygon layer of MSAs
     */
    function setMSAGeoJSONLayer(msaId, layerId) {
        if (!layerId) { return; }
        var valueField = layerId;

        TCVIZ.State.censusField = valueField;
        TCVIZ.Connections.tractMap.getJson(valueField, msaId)
            .done(function(data) {
                data = removeNAs(data, valueField);
                var layer = L.geoJson(data, {
                    style: function(feature) {
                        return stylePolygons(feature, valueField);
                    }
                });

                layer.on('click', function(e) {
                    // Construct a template context object with the current msa
                    // plus the values for the selected msa variables and render
                    // all in the popup template
                    var currentLayer = _.findWhere(TCVIZ.Config.MSA_layers, { value: valueField }),
                        msaValues = e.layer.feature.properties,
                        ctx = _.assign(msaValues, {
                            selectedLayerDisplayChange: currentLayer.text,
                            selectedLayerDisplayYear: currentLayer.id,
                            selectedLayerValue: renderFormat(currentLayer.renderChange, msaValues[currentLayer.value]),
                            selectedLayerValue2015: renderFormat(currentLayer.render, msaValues[sizeVar(currentLayer.value)]),
                            selectedLayerValue2010: renderFormat(currentLayer.render, msaValues[y10Var(currentLayer.value)])
                        });

                    e.layer
                        .bindPopup(TCVIZ.Templates.tractPopup(ctx))
                        .openPopup();
                });

                updateMapLayer(layer);
                setLegend(valueField);
            });
    }

    /**
     * Set a nationwide point layer
     */
    function setNationalGeoJSONLayer(layerId) {
        if (!layerId) { return; }
        var valueField = layerId;

        TCVIZ.State.ntdField = valueField;
        TCVIZ.Connections.msaMap.getJson(valueField)
            .done(function(data) {
                data = removeNAs(data, valueField);
                TCVIZ.State.sizeBreaks = getBreaks(data, sizeVar(valueField), 10);
                var layer = L.geoJson(data, {
                    pointToLayer: function(feature, latlng) {
                        return new L.CircleMarker(latlng,
                            styleCircles(feature, valueField, TCVIZ.State.sizeBreaks)
                        );
                    }
                });

                layer.on('click', function(e) {
                    // Construct a template context object with the current msa
                    // plus the values for the selected msa variables and render
                    // all in the popup template
                    var currentLayer = _.findWhere(TCVIZ.Config.nationwide_layers, { value: valueField }),
                        msaValues = e.layer.feature.properties,
                        ctx = _.assign(msaValues, {
                            selectedLayerDisplayChange: currentLayer.text,
                            selectedLayerDisplayYear: currentLayer.id,
                            selectedLayerValue: renderFormat(currentLayer.renderChange, msaValues[currentLayer.value]),
                            selectedLayerValue2015: renderFormat(currentLayer.render, msaValues[sizeVar(currentLayer.value)]),
                            selectedLayerValue2006: renderFormat(currentLayer.render, msaValues[y06Var(currentLayer.value)])
                        });
                    e.layer
                        .bindPopup(TCVIZ.Templates.msaPopup(ctx))
                        .openPopup();
                });

                updateMapLayer(layer);
                setLegend(valueField);
            });
    }

    /**
     * Set time series plot based on selectize input
     */
    function setRidershipChart(msaId, yLeftVariable, yRightVariable) {
        if (!msaId) { return; }

        var variables = [yLeftVariable];
        if (yRightVariable) { variables.push(yRightVariable); }

        TCVIZ.Connections.chartSql.getTransitData(msaId, variables)
            .done(function (data) {
                var chartData = TCVIZ.Connections.chartSql
                    .transformTransitData(data, variables);
                ridershipChart.update(msaLabelForId(msaId), chartData);
            });
    }

    function setChangeChart(msaId) {
        if (!msaId) { return; }

        var metrics = ['pop_chg', 'upt_rail_chg', 'upt_bus_chg', 'emp_chg'];
        TCVIZ.Connections.chartSql.getTransitData(msaId, metrics)
            .done(function (data) {
                var chartData = TCVIZ.Connections.chartSql
                    .transformTransitData(data, metrics, _.range(2010, 2016));

                changeChart.update(msaLabelForId(msaId), chartData);
            });
    }

    function updateMapLayer(layer) {
        if (featureGroup) {
            map.removeLayer(featureGroup);
        }
        featureGroup = layer;
        map.addLayer(layer);
    }

    /**
     * Set the default/stored map variable value for the current
     * zoom level
     */
    function updateMapDropdown() {
        var layerValue;
        if (isNationWide()) {
            changeToggle(layerToggle, TCVIZ.Config.nationwide_layers);
            layerValue = TCVIZ.State.ntdField || TCVIZ.Config.defaultNtdField;
            TCVIZ.State.ntdField = layerToggle.items[0];
        } else {
            changeToggle(layerToggle, TCVIZ.Config.MSA_layers);
            layerValue = TCVIZ.State.censusField || TCVIZ.Config.defaultCensusField;
            TCVIZ.State.censusField = layerToggle.items[0];
        }
        layerToggle.setValue(layerValue);
    }

    function sizeVar(variable) {

        if (_.last(variable, 2).join('') === '_c') {
            variable = variable.slice(0, -2);
        }
        return (variable + '_y15');
    }

    function y06Var(variable) {
        if (_.last(variable, 2).join('') === '_c') {
            variable = variable.slice(0, -2);
        }
        return (variable + '_y06');
    }

    function y10Var(variable) {
        if (_.last(variable, 2).join('') === '_c') {
            variable = variable.slice(0, -2);
        }
        return (variable + '_y10');
    }

    /**
     * Style graduated symbols based on selected variables
     */
    function styleCircles(feature, colorVariable, sizeBreaks) {
        var styleData = TCVIZ.Config.symbol_style[colorVariable];
        var sizeVariable = sizeVar(colorVariable);
        var sizeBucket = getBucket(feature, sizeVariable, sizeBreaks);
        var size = TCVIZ.Config.circle_sizes[sizeBucket];
        var colorBreak = getBucket(feature, colorVariable, styleData.colorBreaks);
        var color = styleData.colors[colorBreak];
        return {
            radius: size,
            fillOpacity: 0.8,
            color: '#000000',
            weight: 0.5,
            opacity: 0.9,
            fillColor: color
        };
    }

    /**
     * Style polygons
     */
    function stylePolygons(feature, colorVariable) {
        var styleData = TCVIZ.Config.polygon_style[colorVariable];
        var colorBucket = getBucket(feature, colorVariable, styleData.colorBreaks);
        var color = styleData.colors[colorBucket];
        return {
            color: '#000000',
            fillColor: color,
            stroke: true,
            weight: 0.5,
            opacity: 0.5,
            fillOpacity: 0.6
        };
    }

    function isNationWide() {
        return msaToggle.getValue() === TCVIZ.Config.defaultMSA;
    }

    /**
     * For a given layer ID, return the text label.  Defaults to
     * MSA_list unless `useLayerConfig` param is set to true
     */
    function msaLabelForId(msaId, useLayerConfig) {
        var config = useLayerConfig ? TCVIZ.Config.MSA_layers : TCVIZ.Config.MSA_list;
        var msa = _.findWhere(config, {value: msaId});
        return msa && msa.text ? msa.text : msaId;
    }

    function nationalLabelForKey(layerId, key) {
        var layer = _.findWhere(TCVIZ.Config.nationwide_layers, {value: layerId});
        return layer && layer[key] ? layer[key]: layerId;
    }
});
