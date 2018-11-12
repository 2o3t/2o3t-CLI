#!/usr/bin/env node

'use strict';

const chalk = require('chalk').default;
const shell = require('shelljs');

/**
 * Parse Commands
 */
const program = require('commander');
program
    .usage('<project-type> <project-name>')
    .parse(process.argv);


/**
 * Execute Task
 */
const projectType = program.args[0];
const projectName = program.args[1] || 'my-project';

if (!projectType) {
    console.error(chalk.red('[ERROR] Unknown project type!'));
    process.exit(1);
}

console.log(projectType, projectName);

const URL = 'https://github.com/2o3t/2o3t-Templates.git';
shell.exec(`git clone -b master --depth 1 ${URL}`);

if (!shell.ls('2o3t-Templates').includes(projectType)) {
    shell.rm('-rf', '2o3t-Templates');
    console.error(chalk.red('[ERROR] Unknown project type!'));
    process.exit(1);
}

shell.mv('2o3t-Templates/' + projectType, './' + projectName);
shell.rm('-rf', '2o3t-Templates');


// TODO <!-- ##&PROJECT_NAME&## --> 需要替换

const fs = require('fs');
const path = require('path');

const ROOT = path.join(process.cwd(), './library');

const LIB_NAME = projectName;

// <!-- ##&PROJECT_NAME&## -->

const paths = [
    'package.json', // 修改 package.json 需要小写
    './public/index.html', // public/index.html
    './README.MD', // README.MD
];

paths.forEach(p => {
    const itemP = path.join(ROOT, p);
    if (!fs.existsSync(itemP)) {
        console.error(chalk.red(`[ERROR] not found ${p}!`));
        process.exit(1);
    }
    const itemPText = fs.readFileSync(itemP).toString();
    const newItemPText = itemPText.replace(/<!-- ##&PROJECT_NAME&## -->/igm, LIB_NAME);
    fs.writeFileSync(itemP, newItemPText);
});
