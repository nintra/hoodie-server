module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: 'jshint'
    },

    jshint: {
      files: [
        'Gruntfile.js',
        'lib/**/*.js',
        'bin/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    simplemocha: {
      options: {
        reporter: 'spec',
        ignoreLeaks: true
      },
      full: { src: ['test/runner.js'] }
    },

    nodeunit: {
      all: ['test/test-*.js']
    },

    lab : {
      color: true,
      leakDetection: false,
      files:  [
        'test/unit/nodejitsu_server-test.js'
      ]
    }

  });

  grunt.registerTask('test', [
    'jshint',
    'lab',
    'nodeunit:all',
    'simplemocha:full'
  ]);

  // Default task.
  grunt.registerTask('default', ['test']);
  grunt.registerTask('ci', ['test', 'integration-test']);
};
