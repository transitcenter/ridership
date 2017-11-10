module.exports = {
    options: {
        map: false,
        processors: [
            require('autoprefixer')({browsers: ['last 2 versions']}),
            require('cssnano')({
                'safe': true
            })
        ]
    },
    dev: {
        src: 'app/assets/css/*.css'
    },
    dist: {
        src: 'dist/assets/css/*.css'
    }
};