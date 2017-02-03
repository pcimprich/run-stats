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
		testNodeApi: {
		  cmd: 'npm',
		  args: ['run', 'test-node']
		},
		testRedux: {
		  cmd: 'npm',
		  args: ['run', 'test-redux']
		}
	  }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-run');
  
  // Load the plugin that provides the "run" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['run:compileJsx', 'run:bundleJs']);
  grunt.registerTask('test', ['run:testNodeApi', 'run:testRedux']);

};