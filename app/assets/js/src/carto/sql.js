TCVIZ.Carto.SQL = function(element) {
    // properties
    this.element = element;

    this.geojsonClient = new cartodb.SQL(TCVIZ.Config.SQL);

    switch (this.element) {
    case 'msaMap':
        this.queryElements = {
            table: 'msa_change_transit_vars',
            vars: ['*']
        };
        break;

        // this table is not on Carto yet
    case 'censusTracts':
        this.queryElements = {
            table: 'tract_demographic_vars',
            vars: ['*']
        };
        break;

    case 'states':
        this.queryElements = {
            table: 'states_with_gas_prices',
            vars: ['the_geom', 'name']
        };
        break;

    default:
        this.queryElements = null;
    }

    // methods
    this.getSql = function(valueField, msa) {
        var fields;
        if (!this.queryElements.vars.includes(valueField)) {
            fields = this.queryElements.vars.concat(valueField);
        } else {
            fields = this.queryElements.vars;
        }

        var sql = 'SELECT ' + fields.join() + ' FROM ' + this.queryElements.table;

        if (msa !== undefined) {
            return sql + ' WHERE geoid_msa=\'' + msa + '\'';
        } else {
            return sql;
        }
    };

    this.getJson = function(valueField, msa) {
        var sql = this.getSql(valueField, msa);
        return this.geojsonClient.execute(sql);
    };

    this.getBBoxForMSA = function(msaId) {
        var sql = 'SELECT the_geom, geoid_msa FROM tract_demographic_vars WHERE geoid_msa = \'{{msaId}}\'';
        return this.geojsonClient.getBounds(sql, {msaId: msaId}, {format: 'json'});
    };
};
