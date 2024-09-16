const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function getNextBuildVersion(version) {
	const fragments = version.split('.');
	const majorVersion = parseInt(fragments[0]);
	let minorVersion = parseInt(fragments[1]);
	let patchVersion = parseInt(fragments[2]) + 1;

	console.log(majorVersion, minorVersion, patchVersion);
	if (patchVersion > 99) {
		patchVersion = 1;
		minorVersion += 1;
	}

	return [majorVersion, minorVersion, patchVersion].join('.');
}

function getShortCommitHash() {
	const command = process.argv[2];
	const isVersionBump = command === 'bump';

	exec('git rev-parse --short HEAD', (error, stdout, stderr) => {
		if (error) {
			console.error(`Error executing git command: ${error.message}`);
			return;
		}
		if (stderr) {
			console.error(`Error: ${stderr}`);
			return;
		}
		const commitHash = stdout.trim();

		const appPath = path.join(__dirname, '..', 'apps/mobile');
		const appJsonPath = path.join(appPath, 'app.json');
		const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf-8'));
		const gradlePath = path.join(appPath, 'android/app/build.gradle');
		const projPath = path.join(appPath, 'ios/aigo.xcodeproj/project.pbxproj');

		if (isVersionBump || appJson.versionHash != commitHash) {
			let gradleTemplate = fs.readFileSync(gradlePath, 'utf-8');
			let projTemplate = fs.readFileSync(projPath, 'utf-8');

			const nextBuildNumber = appJson.buildNumber + 1;

			appJson.buildHash = commitHash;
			appJson.buildNumber = nextBuildNumber;

			gradleTemplate = gradleTemplate.replace(
				/versionCode \d+/g,
				`versionCode ${nextBuildNumber}`,
			);

			projTemplate = projTemplate.replace(
				/CURRENT_PROJECT_VERSION = \d+;/g,
				`CURRENT_PROJECT_VERSION = ${nextBuildNumber};`,
			);

			if (isVersionBump) {
				const nextVersionName = getNextBuildVersion(appJson.version);

				appJson.version = nextVersionName;

				gradleTemplate = gradleTemplate.replace(
					/versionName \d+/g,
					`versionName ${nextVersionName}`,
				);

				projTemplate = projTemplate.replace(
					/MARKETING_VERSION = \d+\.\d+\.\d+;/g,
					`MARKETING_VERSION = ${nextVersionName};`,
				);
			}

			console.log(
				`new version: ${appJson.version} (${nextBuildNumber} ${commitHash})`,
			);

			fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
			fs.writeFileSync(gradlePath, gradleTemplate);
			fs.writeFileSync(projPath, projTemplate);
		} else {
			console.log('no change detected, skip upgrading version..');
		}
	});
}

getShortCommitHash();
