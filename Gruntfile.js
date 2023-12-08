module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'src/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1
        },
        target: {
            files: [
                {
                    expand: true,
                    cwd: 'styles',
                    src: ['*.css', '!*.min.css'],
                    dest: 'src',
                    ext: '.min.css'
                },
                {
                    'src/all.min.css': ['styles/bare.css', 'styles/custup.css', 'styles/detached.css', 'styles/profilePicture.css', 'styles/resumeUploaderUI.css']
                }
            ]
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify','cssmin']);

};