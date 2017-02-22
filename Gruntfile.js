module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> Competiton <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'public/react/competition-bundle.js',
        dest: 'public/react/competition-bundle.min.js'
      }
    },
	run: {
	    options: {
	      // Task-specific options go here. 
	    },
	    compileJsx: {
	      cmd: 'npm',
	      args: ['run', 'compile-jsx']
	    },
		bundleJs: {
		  cmd: 'npm',
		  args: ['run', 'bundle-js']
		},
		testApi: {
		  cmd: 'npm',
		  args: ['run', 'test-api']
		},
		testReducers: {
		  cmd: 'npm',
		  args: ['run', 'test-reducers']
		}
	  }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-run');
  
  // Load the plugin that provides the "run" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['all']);
  grunt.registerTask('all', ['test', 'build']);
  grunt.registerTask('build', ['run:compileJsx', 'run:bundleJs']);
  grunt.registerTask('test', ['run:testApi', 'run:testReducers']);

};