module.exports = {
    options: {
        sourceMap: true
    },
    dev: {
        files: {
            'app/assets/css/main.css': 'app/assets/sass/main.scss'
        }
    },
    dist: {
        files: {
            'dist/assets/css/main.css': 'app/assets/sass/main.scss'
        }
    }
};