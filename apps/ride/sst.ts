import type { StackContext } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

import { getDomainNameByStage, hostedZone } from '../../tools/stacks/shared';

const rideAlias = {
	production: 'ride.',
	staging: 'staging.ride.',
	development: 'dev.ride.',
};

export const ride = ({ stack, app }: StackContext) => {
	const domainName = getDomainNameByStage(
		rideAlias[app.stage as keyof typeof rideAlias],
	);
	const site = new NextjsSite(stack, 'ride', {
		path: 'apps/ride',
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

export default ride;
