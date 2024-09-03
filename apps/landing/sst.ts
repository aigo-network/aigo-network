import type { StackContext, StaticSiteDomainProps } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

import {
	baseDomainName,
	constructDomainName,
	hostedZone,
} from '../../tools/stacks/shared';

export const landing = ({ stack, app }: StackContext) => {
	const customDomain: StaticSiteDomainProps = {
		domainName: constructDomainName('landing', app.stage),
		hostedZone,
	};

	if (app.stage === 'production') {
		customDomain.domainAlias = `www.${baseDomainName}`;
	}

	const site = new NextjsSite(stack, 'landing', {
		path: 'apps/landing',
		edge: true,
		timeout: '5 seconds',
		customDomain,
	});

	stack.addOutputs({
		url: site.url,
		domainName: site.customDomainUrl,
	});
};

export default landing;
