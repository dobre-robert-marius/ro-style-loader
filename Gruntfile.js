const matchdep = require('matchdep');


module.exports = (grunt) => {
  // load all grunt plugins from node_modules folder
  matchdep.filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      pre_commit_tests: {
        command: 'testem ci',
      },
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
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

  grunt.registerTask('deploy:patch', ['bump-only:patch', 'build:prod', 'shell:pre_commit_tests', 'bump-commit', 'release:patch']);
  grunt.registerTask('deploy:minor', ['bump-only:minor', 'build:prod', 'shell:pre_commit_tests', 'bump-commit', 'release:minor']);
  grunt.registerTask('deploy:major', ['bump-only:major', 'build:prod', 'shell:pre_commit_tests', 'bump-commit', 'release:major']);
  grunt.registerTask('deploy', ['deploy:patch']);

  grunt.registerTask('default', ['deploy']);
};
