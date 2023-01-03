'use strict';

const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const { platform, bin } = require('addon-tools-raub');


(async () => {
	try {
		await exec(`cd ${bin} && tar -acf ../${platform}.zip *`);
		console.log(`zip=${platform}.zip`);
	} catch (error) {
		console.error(error);
		process.exit(-1);
	}
})();
