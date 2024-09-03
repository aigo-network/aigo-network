import type { StackContext } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

import { constructDomainName, hostedZone } from '../../tools/stacks/shared';

export const webApp = ({ stack, app }: StackContext) => {
	const domainName = constructDomainName('quest', app.stage);
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
