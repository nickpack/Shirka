'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // JS
    concat: {
      all: {
        files: {
          'build/js/libs.js': ['src/js/libs/jquery/jquery.js', 'src/js/libs/**/*.js'],
          'build/js/<%= pkg.name %>.js': 'src/js/scripts/**/*.js'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      project: {
        src: 'build/js/<%= pkg.name %>.js',
        dest: 'build/js/<%= pkg.name %>.min.js'
      },
      libs: {
        src: 'build/js/libs.js',
        dest: 'build/js/libs.min.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: false,
          module: true,
          document: true
        }
      }
    },
    // CSS
    sass: {
        dist: {
            files: {
                'build/css/<%= pkg.name %>.css': 'src/scss/style.scss',
            }
        }
    },
    csslint: {
      scssoutput: {
        options: {
          import: false
        },
        src: ['build/css/<%= pkg.name %>.css']
      }
    },
    cssmin: {
      compress: {
        options: {
          banner: '/* <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */'
        },
        files: {
          'build/css/<%= pkg.name %>.min.css': 'build/css/<%= pkg.name %>.css'
        }
      },
    },
    // Templates
    template: {
      index: {
        src: 'src/index.html',
        dest: 'build/index.html',
        engine: 'ejs',
        variables: {
          css_name: '<%= pkg.name %>.min.css',
          js_name: '<%= pkg.name %>.min.js',
          pretty: true
        }
      }
    },
    // General
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/', src: ['*'], dest: 'build/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['img/**'], dest: 'build/'},
          {expand: true, cwd: 'src/',src: ['assets/**'], dest: 'build/'},
        ]
      }
    },
    watch: {
      files: 'src/**/*',
      tasks: ['sass', 'concat', 'cssmin', 'uglify', 'copy', 'template']
    },
    livereload: {
      port: 35729 // Default livereload listening port.
    },
    connect: {
      livereload: {
        options: {
          port: 8001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },
    regarde: {
      project: {
        files: 'src/**/*',
        tasks: ['livereload']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-templater');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('lint', ['jshint', 'csslint']);
  grunt.registerTask('minify', ['sass', 'concat', 'cssmin', 'uglify']);
  grunt.registerTask('build', ['sass', 'concat', 'cssmin', 'uglify', 'copy', 'template']);
  grunt.registerTask('reloader', ['livereload-start', 'connect', 'regarde']);
};