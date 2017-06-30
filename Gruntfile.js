const matchdep = require('matchdep');


module.exports = (grunt) => {
  // load all grunt plugins from node_modules folder
  matchdep.filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      build_lib: {
        command: 'npm run build',
      },
    },
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: '%VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: true,
        prereleaseName: false,
        regExp: false,
      },
    },
    release: {
      options: {
        bump: false,
        commit: false,
        tag: false,
        pushTags: false,
        npm: true,
      },
    },

  });

  grunt.registerTask('deploy:patch', ['bump-only:patch', 'shell:build_lib', 'bump-commit', 'release:patch']);
  grunt.registerTask('deploy:minor', ['bump-only:minor', 'shell:build_lib', 'bump-commit', 'release:minor']);
  grunt.registerTask('deploy:major', ['bump-only:major', 'shell:build_lib', 'bump-commit', 'release:major']);
  grunt.registerTask('deploy', ['deploy:patch']);

  grunt.registerTask('default', ['deploy']);
};
