const { writeFile, unlink } = require('fs/promises');

const vaultOptions = {
	onePassword: {
		auth: process.env.OP_SERVICE_ACCOUNT_TOKEN,
		integrationName: 'metacraft-developers',
		integrationVersion: 'v1.0.0',
		vaultIds: [
			'i5s2jmizo7wmx42y2ibnkkx66a/5v3kwk35kr7oq6hgddsgygayou',
			'dl7qjj6zn4g3luzb6lzdryt55i/yzorkcgc27ecydwdsszstzswti',
		],
	},
	callback: async (fieldMap) => {
		const sharedEnv = fieldMap['.env.shared'];
		const androidProps = fieldMap['android/local.properties'];

		for (const environment of ['production', 'development']) {
			const googleServiceKey = `apps/mobile/android/app/google-services-${environment}.json`;
			const googleServiceJson = fieldMap[googleServiceKey];

			if (googleServiceJson) {
				let injectedHead = '';
				const parsedJson = JSON.parse(googleServiceJson.value);
				const envFileName = `.env.${environment}`;
				const originalEnvContent = fieldMap[envFileName].value;
				const firstClient = parsedJson.client?.[0];
				const otherAuthClient = extractOtherAuthClient(firstClient);
				const webAuthClient = extractWebAuthClient(firstClient);

				if (otherAuthClient) {
					const otherAuthId = otherAuthClient.client_id;
					injectedHead += `FIREBASE_IOS_CLIENT_ID="${otherAuthId}"\n`;
					injectedHead += `FIREBASE_IOS_REVERSED_CLIENT_ID="${reversedId(otherAuthId)}"\n`;
				}

				if (webAuthClient) {
					const webAuthId = webAuthClient.client_id;
					injectedHead += `FIREBASE_WEB_CLIENT_ID="${webAuthId}"\n`;
				}

				if (sharedEnv?.value) {
					injectedHead += `${sharedEnv.value}\n`;
				}

				const combinedEnvContent = `${injectedHead}\n${originalEnvContent}`;
				await writeFile(envFileName, combinedEnvContent);
			}
		}

		if (sharedEnv?.title) {
			await unlink(sharedEnv.title);
		}

		if (androidProps?.value) {
			const sdkPath = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
			const dynamicHead = `sdk.dir="${sdkPath}"`;
			const generatedProps = `${dynamicHead}\n\n${androidProps.value}`;
			await writeFile(androidProps.title, generatedProps);
		}
	},
};

const firebaseClientTypes = {
	native: 1,
	others: 2,
	web: 3,
};

const extractOtherAuthClient = (client) => {
	return client.services?.appinvite_service?.other_platform_oauth_client?.find(
		(item) => item?.client_type === firebaseClientTypes.others,
	);
};

const extractWebAuthClient = (client) => {
	return client.oauth_client?.find(
		(item) => item.client_type === firebaseClientTypes.web,
	);
};

const reversedId = (fragment) => fragment.split('.').reverse().join('.');

module.exports = {
	vaultOptions,
};
