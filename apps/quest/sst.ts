import type { StackContext } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

import { getDomainNameByStage, hostedZone } from '../../tools/stacks/shared';

const webAppAlias = {
	production: 'quest.',
	staging: 'staging.quest.',
	development: 'dev.quest.',
};

export const webApp = ({ stack, app }: StackContext) => {
	const domainName = getDomainNameByStage(
		webAppAlias[app.stage as keyof typeof webAppAlias],
	);
	const site = new NextjsSite(stack, 'web-app', {
		path: 'apps/quest',
		edge: true,
		timeout: '5 seconds',
		customDomain: {
			domainName,
			hostedZone,
		},
	});

	stack.addOutputs({
		url: site.url,
		domainName,
	});
};

export default webApp;
