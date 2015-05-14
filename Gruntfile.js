module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');

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
    }

  });


  grunt.registerTask('unitTest', ['mochaTest']);
};
