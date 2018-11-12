#!/usr/bin/env node

'use strict';

const pkg = require('../package.json');

/**
 * Parse Commands
 */
const program = require('commander');
program
    .usage('<task> [options]')
    .version(pkg.version)
    // Project commands
    .command('init <project-type> <project-name>', 'Initialize a project')
    // .command('dev', 'Run webpack develop server')
    // .command('build', 'Build a distribution')
    // .command('serve', 'Run a static server')
    // .command('doc', 'Run a documents server')
    // .command('test', 'test a project')
    // .command('publish <version>', 'Publish a new version')
    // .command('ghpages', 'Push output directory to gh-pages')
    // .command('dep', 'List dependencies of 2o3t-cli')
    // // Component commands
    // .command('transform <vue-path>', 'Transform Vue component between singlefile and multifile pattern')
    .parse(process.argv);
