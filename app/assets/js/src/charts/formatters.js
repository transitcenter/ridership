TCVIZ.Charts.Formatters = {
    number: function (value) {
        return parseFloat(value).toLocaleString();
    },
    totalRidership: function (value) {
        return (parseFloat(value) / 1000000).toLocaleString() + 'M';
    },
    percent: function (value) {
        return parseFloat(value).toFixed(2);
    }
};
