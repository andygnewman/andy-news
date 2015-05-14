module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-protractor-webdriver');
  grunt.loadNpmTasks('grunt-express-server');

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
    },

    protractor_webdriver: {
      e2e: {
        options: {
          command: 'webdriver-manager start'
        }
      }
    },

    protractor: {
      options: {
        configFile: 'test/protractor.conf.js',
        coColor: false,
        debug: false,
        args: {}
      },
      e2e: {
        options: {
          keepAlive: true
        }
      }
    },

    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test'
      }
    },

    express: {
      test: {
        options: {
          script: './bin/www'
        }
      }
    }

  });


  grunt.registerTask('unitTest', ['env:test', 'mochaTest', 'karma:continuous']);
  grunt.registerTask('e2e', ['env:test', 'express:test',
    'protractor_webdriver:e2e','protractor:e2e']);
};
