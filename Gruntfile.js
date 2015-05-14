module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    jshint: {
      src: ['models/','public/javascripts/', 'routes/']
    },
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          ui: 'bdd',
          require: 'should'
        },
        src: ['test/unit/mongoose/*.js']
      }
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      },
      continuous: {
        configFile: 'test/karma.conf.js',
        singleRun: true,
        browsers: ['Chrome']
      }
    }

  });


  grunt.registerTask('unitTest', ['mochaTest', 'karma:continuous']);
};
