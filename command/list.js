'use strict';
const request = require('request');
const ora = require('ora');
const chalk = require('chalk');

const config = require('../templates');

module.exports = () => {
    const spinner = ora('Loading template list').start();
    request(
        {
            url: 'https://api.github.com/users/omycli/repos',
            headers: {
                'User-Agent': 'omycli'
            }
        },
        function(err, res, body) {
            spinner.stop();
            if (err) return console.error(err);

            const requestBody = JSON.parse(body);
            if (Array.isArray(requestBody)) {
                console.log();
                console.log('最新的内置模板列表:');
                console.log();
                
                requestBody.forEach(repo =>
                    console.log(chalk.greenBright.bold(
                        '      - ' + repo.name + '  ' + repo.description
                    ))
                );
                console.log();
                console.log('使用方法：');
                console.log(chalk.cyan('      omycli init '));
                console.log();

                console.log('最新的扩展库模板列表：\n');
                console.log(chalk.magentaBright(JSON.stringify(config.tpl, null, 4)));
                console.log();
                console.log();
                console.log();
            } else {
                console.error(requestBody.message);
            }
        }
    );
    // process.exit();
};
