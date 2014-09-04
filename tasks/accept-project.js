require('protractor');

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-external-daemon');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.config.merge({
    connect: {
      webserver: {}
    },

    external_daemon: {
      webdriver: {
        options: {
          startCheck: function (stdout) {
            return /Started org.openqa.jetty.jetty.Server/.test(stdout);
          }
        },
        cmd: './node_modules/protractor/bin/webdriver-manager',
        args: ['start']
      }
    },

    protractor: {
      options: {
        configFile: 'protractor.conf.js',
        debug: !!grunt.option('debug')
      },
      accept: {}
    }

  });

  grunt.registerTask('accept', [
    'external_daemon:webdriver',
    'connect:webserver',
    'protractor:accept'
  ]);

};
