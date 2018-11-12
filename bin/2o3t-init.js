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

console.info(chalk.green(`Project Type: ${projectType}`));
console.info(chalk.green(`Project Name: ${projectName}`));

const timetemp = Date.now();
const distName = `template_${timetemp}`;
const URL = 'https://github.com/2o3t/2o3t-Templates.git';
shell.exec(`git clone -b master --depth 1 ${URL} ${distName} --progress`);

if (!shell.ls(distName).includes(projectType)) {
    shell.rm('-rf', distName);
    console.error(chalk.red('[ERROR] Unknown project type!'));
    process.exit(1);
}

shell.mv(distName + '/' + projectType, './' + projectName);
shell.rm('-rf', distName);


// <!-- ##&PROJECT_NAME&## --> 需要替换

const fs = require('fs');
const path = require('path');

const LIB_NAME = projectName;
const ROOT = path.join(process.cwd(), LIB_NAME);

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
    let name = LIB_NAME;
    if (p.endsWith('package.json')) {
        name = LIB_NAME.toLowerCase();
    }
    const newItemPText = itemPText.replace(/<!-- ##&PROJECT_NAME&## -->/igm, name);
    fs.writeFileSync(itemP, newItemPText);
});

// cd LIB_NAME && yarn
console.info(chalk.yellowBright(`\n\ncd ${LIB_NAME} && yarn\n\n`));
