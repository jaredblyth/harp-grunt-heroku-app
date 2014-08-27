module.exports = function(grunt) {
    
    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),
		useminPrepare: {
            html: ['<%= pkg.destDir %>{,*/}*.html'], 
            options: {
                dest: '<%= pkg.destDir %>'
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
						cwd: '<%= pkg.srcDir %>',
                        dest: '<%= pkg.destDir %>',
                        src: [
                            //'**' // Copies all files & folders, otherwise use below to copy specific files only
							'*.html',
							'bower_components/jquery/jquery.min.js',
							'blog/**'
                        ]
                    }
				]
            }
        },
		uglify: {
            options: {
                banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= pkg.srcDir %>scripts/*.js',
                dest: '<%= pkg.destDir %>scripts/script.min.js'
            }
        },
        cssmin: {
            options: {
                banner: '/*! CSS Build - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= pkg.srcDir %>css/*.css',
                dest: '<%= pkg.destDir %>css/combined.min.css'
            },
			files: {
                src: '<%= pkg.destDir %>css/combined.min.css',
                dest: '.tmp/concat/css/combined.min.css'
            }
        },
		removelogging: {
    dist: {
      src: "dist/**/*.js" // Each file will be overwritten with the output!
    }
  },
		usemin: {
            html: ['<%= pkg.destDir %>{,*/}*.html'],
            css: ['<%= pkg.destDir %>css/{,*/}*.css'],
            options: {
                dirs: ['<%= pkg.destDir %>']
            }
        },
		clean: {
            server: ['.tmp','www']
        },
        watch: {
            scripts: {
                files: ['<%= pkg.srcDir %>scripts/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
        }
    });
    
    grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks("grunt-remove-logging");
	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('build', [
		'useminPrepare',
		'copy',
		'uglify',
		'cssmin',
		'removelogging',
		'usemin',
		'clean'
	]);
	
	grunt.registerTask('default', ['build']);
    
}