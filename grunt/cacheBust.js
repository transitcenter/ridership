module.exports = {
    dist: {
        options: {
            assets: [
                'assets/js/*',
                'assets/css/*'
            ],
            baseDir: 'dist',
            queryString: true
        },
        src: ['dist/index.html']
    }
};