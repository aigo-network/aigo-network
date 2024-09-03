import type { StackContext } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

import { constructDomainName, hostedZone } from '../../tools/stacks/shared';

export const ride = ({ stack, app }: StackContext) => {
	const domainName = constructDomainName('ride', app.stage);
	const site = new NextjsSite(stack, 'ride', {
		path: 'apps/ride',
		edge: true,
		timeout: '5 seconds',
		customDomain: {
			domainName,
			hostedZone,
			domainAlias: `www.${domainName}`,
		},
	});

	stack.addOutputs({
		url: site.url,
		domainName,
	});
};

export default ride;
