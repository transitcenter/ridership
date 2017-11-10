module.exports = {
    dist: {
        files: [
            {
                expand: true,
                cwd: 'app',
                src: 'index.html',
                dest: 'dist/'
            },
            {
                expand: true,
                cwd: 'app/assets/js',
                src: '**',
                dest: 'dist/assets/js/'
            },
            {
                expand: true,
                cwd: 'app/assets/fonts',
                src: '**',
                dest: 'dist/assets/fonts/'
            },
            {
                expand: true,
                cwd: 'app/assets/images',
                src: '**',
                dest: 'dist/assets/images/'
            }
        ]
    }
};