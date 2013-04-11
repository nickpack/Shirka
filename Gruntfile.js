module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // JS
    concat: {
      development: {
        files: {
          'build/js/libs.js': ['src/js/libs/jquery/jquery.js', 'src/js/libs/**/*.js'],
          'build/js/<%= pkg.name %>.js': 'src/js/scripts/**/*.js'
        }
      },
      production: {
        files: {
          'release/js/libs.js': ['src/js/libs/jquery/jquery.js', 'src/js/libs/**/*.js'],
          'release/js/<%= pkg.name %>.js': 'src/js/scripts/**/*.js'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      project: {
        src: 'release/js/<%= pkg.name %>.js',
        dest: 'release/js/<%= pkg.name %>.min.js'
      },
      libs: {
        src: 'release/js/libs.js',
        dest: 'release/js/libs.min.js'
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
        development: {
            files: {
                'build/css/<%= pkg.name %>.css': 'src/scss/style.scss'
            }
        },
        production: {
            files: {
                'release/css/<%= pkg.name %>.css': 'src/scss/style.scss'
            }
        }
    },
    csslint: {
      scssoutput: {
        options: {
          'vendor-prefix': false,
          'adjoining-classes': false
        },
        src: ['release/css/<%= pkg.name %>.css']
      }
    },
    cssmin: {
      compress: {
        options: {
          banner: '/* <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */'
        },
        files: {
          'release/css/<%= pkg.name %>.min.css': 'release/css/<%= pkg.name %>.css'
        }
      }
    },
    // Templates
    swig: {
      development: {
        root: "src/",
        dest: "build/",
        src: "src/**/*.swig",
        css_name: '<%= pkg.name %>.css',
        js_name: '<%= pkg.name %>.js',
        siteUrl: 'http://www.somedomain.com/',
        cache: false,
        sitemap_priorities: {
            '_DEFAULT_': '0.5',
            'index': '0.8'
          }
      },
      production: {
        root: "src/",
        dest: "release/",
        src: "src/**/*.swig",
        css_name: '<%= pkg.name %>.min.css',
        js_name: '<%= pkg.name %>.min.js'
      }
    },
    // General
    copy: {
      development: {
        files: [
          {expand: true, cwd: 'src/', src: ['*', '!*.swig'], dest: 'build/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['img/**'], dest: 'build/'},
          {expand: true, cwd: 'src/',src: ['assets/**'], dest: 'build/'}
        ]
      },
      production: {
        files: [
          {expand: true, cwd: 'src/', src: ['*', '!*.swig'], dest: 'release/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['img/**'], dest: 'release/'},
          {expand: true, cwd: 'src/',src: ['assets/**'], dest: 'release/'}
        ]
      }
    },
    watch: {
      files: 'src/**/*',
      tasks: ['sass', 'concat', 'copy', 'swig:development']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-swig');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('lint', ['jshint', 'csslint']);
  grunt.registerTask('minify', ['sass:production', 'concat:production', 'cssmin', 'uglify']);
  grunt.registerTask('build', ['sass:development', 'concat:development', 'copy:development', 'swig:development']);
  grunt.registerTask('release', ['sass:production', 'concat:production', 'cssmin', 'uglify', 'copy:production', 'swig:production']);

};