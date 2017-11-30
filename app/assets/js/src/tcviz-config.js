TCVIZ.Config = {
    map: {
        center: [39.500, -98.35],
        zoom: 4
    },
    SQL: {
        user: 'ridership',
        format: 'geojson'
    },
    defaultNtdField: 'upt_total_c',
    defaultCensusField: 'pp_dn_c',
    defaultMSA: 'NNNNN',
    ridershipChartLeftAxisDefault: 'upt_total',
    ridershipChartRightAxisDefault: 'avg_fare',
    nationwide_layers: [{
        text: 'Total Ridership (% change)',
        value: 'upt_total_c',
        absoluteValue: 'upt_total',
        render: 'number',
        renderChange: 'percent',
        id: 'Total Ridership'
    }, {
        text: 'Bus Ridership (% change)',
        value: 'upt_bus_c',
        absoluteValue: 'upt_bus',
        render: 'number',
        renderChange: 'percent',
        id: 'Bus Ridership'
    }, {
        text: 'Rail Ridership (% change)',
        value: 'upt_rail_c',
        absoluteValue: 'upt_rail',
        render: 'number',
        renderChange: 'percent',
        id: 'Rail Ridership'
    }, {
        text: 'Average Fare (gross change)',
        value: 'avg_fare_c',
        absoluteValue: 'avg_fare',
        render: 'money',
        renderChange: 'money',
        id: 'Average Fare'
    }, {
        text: 'Average Speed (gross change)',
        value: 'average_speed_c',
        absoluteValue: 'average_speed',
        render: 'number',
        renderChange: 'number',
        id: 'Average Speed'
    }, {
        text: 'Farebox Recovery (gross change)',
        value: 'farebox_recovery_c',
        absoluteValue: 'farebox_recovery',
        render: 'money',
        renderChange: 'money',
        id: 'Farebox Recovery'
    }, {
        text: 'Vehicle Revenue Miles (% change)',
        value: 'revenue_miles_c',
        absoluteValue: 'revenue_miles',
        render: 'number',
        renderChange: 'percent',
        id: 'Vehicle Revenue Miles'
    }, {
        text: 'Expenses (% change)',
        value: 'total_expenses_c',
        absoluteValue: 'total_expenses',
        render: 'money',
        renderChange: 'percent',
        id: 'Expenses'
    }, {
        text: 'Statewide Gas Prices (% change)',
        value: 'gas_c',
        absoluteValue: 'gas',
        render: 'money',
        renderChange: 'percent',
        id: 'Statewide Gas Prices'
    }],
    MSA_layers: [{
        text: 'Population Density (gross change)',
        value: 'pp_dn_c',
        absoluteValue: 'pop_dens',
        render: 'number',
        renderChange: 'number',
        id: 'Population Density (residents/sq.miles)'
    }, {
        text: '% Drove Alone Commute (change total %)',
        value: 'drove_c',
        absoluteValue: 'pct_drove_alone',
        render: 'percent',
        renderChange: 'percent',
        id: '% Drove Alone Commute'
    }, {
        text: '% Public Transit Commute (change total %)',
        value: 'trnst_c',
        absoluteValue: 'pct_transit',
        render: 'percent',
        renderChange: 'percent',
        id: '% Public Transit Commute'
    }, {
        text: '% Carpool Commute (change total %)',
        value: 'carpl_c',
        absoluteValue: 'pct_carpooled',
        render: 'percent',
        renderChange: 'percent',
        id: '% Carpool Commute'
    }, {
        text: 'Employed Civilian (gross change)',
        value: 'emp_c',
        absoluteValue: 'tot_emp',
        render: 'number',
        renderChange: 'number',
        id: 'Employed Civilian'
    }, {
        text: '% Households with No Vehicle (change total %)',
        value: 'veh_c',
        absoluteValue: 'pct_hh_no_vehicle',
        render: 'percent',
        renderChange: 'percent',
        id: '% Households with No Vehicle'
    }, {
        text: 'Median Household Income (gross change)',
        value: 'inc_c',
        absoluteValue: 'med_hh_inc',
        render: 'money',
        renderChange: 'money',
        id: 'Median Household Income'
    },{
        text: '% Families in Poverty (change total %)',
        value: 'fpov_c',
        absoluteValue: 'pct_fam_pov',
        render: 'percent',
        renderChange: 'percent',
        id: '% Families in Poverty'
    },{
        text: '% Population Foreign Born (change total %)',
        value: 'forgn_c',
        absoluteValue: 'pct_pop_foreign',
        render: 'percent',
        renderChange: 'percent',
        id: '% Population Foreign Born'
    }, {
        text: '% Black (change total %)',
        value: 'black_c',
        absoluteValue: 'pct_black',
        render: 'percent',
        renderChange: 'percent',
        id: '% Black'
    }, {
        text: '% Asian (change total %)',
        value: 'asian_c',
        absoluteValue: 'pct_asian',
        render: 'percent',
        renderChange: 'percent',
        id: '% Asian'
    }, {
        text: '% White (change total %)',
        value: 'white_c',
        absoluteValue: 'pct_white',
        render: 'percent',
        renderChange: 'percent',
        id: '% White'
    }, {
        text: '% Hispanic/Latino of any race (change total %)',
        value: 'hisp_c',
        absoluteValue: 'pct_hisp',
        render: 'percent',
        renderChange: 'percent',
        id: '% Hispanic/Latino of any race'
    }],
    MSA_list: [{
        text: 'National Average',
        value: 'NNNNN'
    }, {
        text: 'Atlanta-Sandy Springs-Roswell, GA',
        value: '12060'
    }, {
        text: 'Austin-Round Rock, TX',
        value: '12420'
    }, {
        text: 'Baltimore-Columbia-Towson, MD',
        value: '12580'
    }, {
        text: 'Birmingham-Hoover, AL',
        value: '13820'
    }, {
        text: 'Boston-Cambridge-Newton, MA-NH',
        value: '14460'
    }, {
        text: 'Buffalo-Cheektowaga-Niagara Falls, NY',
        value: '15380'
    }, {
        text: 'Charlotte-Concord-Gastonia, NC-SC',
        value: '16740'
    }, {
        text: 'Chicago-Naperville-Elgin, IL-IN-WI',
        value: '16980'
    }, {
        text: 'Cincinnati, OH-KY-IN',
        value: '17140'
    }, {
        text: 'Cleveland-Elyria, OH',
        value: '17460'
    }, {
        text: 'Columbus, OH',
        value: '18140'
    }, {
        text: 'Dallas-Fort Worth-Arlington, TX',
        value: '19100'
    }, {
        text: 'Denver-Aurora-Lakewood, CO',
        value: '19740'
    }, {
        text: 'Detroit-Warren-Dearborn, MI',
        value: '19820'
    }, {
        text: 'Grand Rapids-Wyoming, MI',
        value: '24340'
    }, {
        text: 'Hartford-West Hartford-East Hartford, CT',
        value: '25540'
    }, {
        text: 'Houston-The Woodlands-Sugar Land, TX',
        value: '26420'
    }, {
        text: 'Indianapolis-Carmel-Anderson, IN',
        value: '26900'
    }, {
        text: 'Jacksonville, FL',
        value: '27260'
    }, {
        text: 'Kansas City, MO-KS',
        value: '28140'
    }, {
        text: 'Las Vegas-Henderson-Paradise, NV',
        value: '29820'
    }, {
        text: 'Los Angeles-Long Beach-Anaheim, CA',
        value: '31080'
    }, {
        text: 'Louisville/Jefferson County, KY-IN',
        value: '31140'
    }, {
        text: 'Memphis, TN-MS-AR',
        value: '32820'
    }, {
        text: 'Miami-Fort Lauderdale-West Palm Beach, FL',
        value: '33100'
    }, {
        text: 'Milwaukee-Waukesha-West Allis, WI',
        value: '33340'
    }, {
        text: 'Minneapolis-St. Paul-Bloomington, MN-WI',
        value: '33460'
    }, {
        text: 'Nashville-Davidson–Murfreesboro–Franklin, TN',
        value: '34980'
    }, {
        text: 'New Orleans-Metairie, LA',
        value: '35380'
    }, {
        text: 'New York-Newark-Bridgeport, NY-NJ-PA',
        value: '35620'
    }, {
        text: 'Oklahoma City, OK',
        value: '36420'
    }, {
        text: 'Orlando-Kissimmee-Sanford, FL',
        value: '36740'
    }, {
        text: 'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD',
        value: '37980'
    }, {
        text: 'Phoenix-Mesa-Scottsdale, AZ',
        value: '38060'
    }, {
        text: 'Pittsburgh, PA',
        value: '38300'
    }, {
        text: 'Portland-Vancouver-Hillsboro, OR-WA',
        value: '38900'
    }, {
        text: 'Providence-Warwick, RI-MA',
        value: '39300'
    }, {
        text: 'Raleigh, NC',
        value: '39580'
    }, {
        text: 'Richmond, VA',
        value: '40060'
    }, {
        text: 'Riverside-San Bernardino-Ontario, CA',
        value: '40140'
    }, {
        text: 'Rochester, NY',
        value: '40380'
    }, {
        text: 'Sacramento–Roseville–Arden-Arcade, CA',
        value: '40900'
    }, {
        text: 'Salt Lake City, UT',
        value: '41620'
    }, {
        text: 'San Antonio-New Braunfels, TX',
        value: '41700'
    }, {
        text: 'San Diego-Carlsbad, CA',
        value: '41740'
    }, {
        text: 'San Francisco-Oakland-Hayward, CA',
        value: '41860'
    }, {
        text: 'San Jose-Sunnyvale-Santa Clara, CA',
        value: '41940'
    }, {
        text: 'Seattle-Tacoma-Bellevue, WA',
        value: '42660'
    }, {
        text: 'St. Louis, MO-IL',
        value: '41180'
    }, {
        text: 'Tampa-St. Petersburg-Clearwater, FL',
        value: '45300'
    }, {
        text: 'Tucson, AZ',
        value: '46060'
    }, {
        text: 'Tulsa, OK',
        value: '46140'
    }, {
        text: 'Urban Honolulu, HI',
        value: '46520'
    }, {
        text: 'Virginia Beach-Norfolk-Newport News, VA-NC',
        value: '47260'
    }, {
        text: 'Washington-Arlington-Alexandria, DC-VA-MD-WV',
        value: '47900'
    }],
    circle_sizes: [10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30, 32.5, 35],
    symbol_style: {
        upt_total_c: {
            colors: ['#f3e79b', '#fab27f', '#eb7f86', '#b95e9a', '#5c53a5'],
            colorBreaks: [-25,-10,0.0,50,100]
        },
        upt_bus_c: {
            colors: ['#f3e79b', '#fab27f', '#eb7f86', '#b95e9a', '#5c53a5'],
            colorBreaks: [-25,-10,0.0,50,100]
        },
        upt_rail_c: {
            colors: ['#f3e79b', '#fab27f', '#eb7f86', '#b95e9a', '#5c53a5'],
            colorBreaks: [-25,-10,0.0,50,100]
        },
        avg_fare_c: {
            colors: ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'],
            colorBreaks: [-0.25,-0.1,0.0,0.1,0.5]
        },
        farebox_recovery_c: {
            colors: ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'],
            colorBreaks: [-0.05,-0.025,0.0,0.025,0.05]
        },
        total_expenses_c: {
            colors: ['#dfe8b8', '#f4dd9e', '#ffab5a', '#ff6161', '#ff1717'],
            colorBreaks: [0,25,50,75,100]
        },
        average_speed_c: {
            colors: ['#008837', '#a6dba0', '#f7f7f7', '#c2a5cf', '#7b3294'],
            colorBreaks: [-0.5,-0.25,0.0,0.5,1]
        },
        revenue_miles_c: {
            colors: ['#009b9e', '#7cc5c6', '#f1f1f1', '#dda9cd', '#c75dab'],
            colorBreaks: [-2.5,0,25,50,75]
        },
        revenue_hours_c: {
            colors: ['#009b9e', '#f3e0f7', '#d1afe8', '#9f82ce', '#63589f'],
            colorBreaks: [-0.025,0.1,0.5,0.75,1]
        },
        gas_c: {
            colors: ['#f3e79b', '#fab27f', '#eb7f86', '#b95e9a', '#5c53a5'],
            colorBreaks: [-8,-5,0.0,5,10]
        }
    },

    polygon_style: {
        forgn_c: {
            colors: ['#c75dab', '#dda9cd', '#f2dfec', '#7cc5c6', '#009b9e'],
            colorBreaks: [-5,-3,0,3,10]
        },
        drove_c: {
            colors: ['#7b3294', '#c2a5cf', '#e3d4ea', '#a6dba0', '#008837'],
            colorBreaks: [-10,-5,0,5,10]
        },
        carpl_c: {
            colors: ['#7b3294', '#c2a5cf', '#e3d4ea', '#a6dba0', '#008837'],
            colorBreaks: [-5,-2,0,2,5]
        },
        trnst_c: {
            colors: ['#7b3294', '#c2a5cf', '#e3d4ea', '#a6dba0', '#008837'],
            colorBreaks: [-5,-2,0,2,5]
        },
        emp_c: {
            colors: ['#a16928', '#caa873', '#edeac2', '#98b7b2', '#2887a1'],
            colorBreaks: [-500,-200,0,200,500]
        },

        inc_c: {
            colors: ['#d01c8b', '#f1b6da', '#e3d4ea', '#b8e186', '#4d9221'],
            colorBreaks: [-10000,-5000,0,5000,10000]
        },
        pp_dn_c: {
            colors: ['#c75dab', '#dda9cd', '#f2dfec', '#7cc5c6', '#009b9e'],
            colorBreaks: [-1000,-50,0,50,1000]
        },
        veh_c: {
            colors: ['#7b3294', '#c2a5cf', '#e3d4ea', '#a6dba0', '#008837'],
            colorBreaks: [-5,-2,0,2,5]
        },
        fpov_c: {
            colors: ['#4dac26', '#b8e186', '#e3d4ea', '#f1b6da', '#d01c8b'],
            colorBreaks: [-5,-2,0,2,5]
        },
        black_c: {
            colors: ['#c75dab', '#dda9cd', '#f2dfec', '#7cc5c6', '#009b9e'],
            colorBreaks: [-5,-2,0,2,5]
        },
        asian_c: {
            colors: ['#c75dab', '#dda9cd', '#f2dfec', '#7cc5c6', '#009b9e'],
            colorBreaks: [-5,-2,0,2,5]
        },
        hisp_c: {
            colors: ['#c75dab', '#dda9cd', '#f2dfec', '#7cc5c6', '#009b9e'],
            colorBreaks: [-5,-2,0,2,5]
        },
        white_c: {
            colors: ['#c75dab', '#dda9cd', '#f2dfec', '#7cc5c6', '#009b9e'],
            colorBreaks: [-5,-2,0,2,5]
        }
    }

};
