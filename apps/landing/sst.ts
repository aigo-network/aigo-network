import type { StackContext, StaticSiteDomainProps } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

import {
	baseDomainName,
	getDomainNameByStage,
	hostedZone,
} from '../../tools/stacks/shared';

const landingAlias = {
	production: ' ',
	staging: 'staging.',
	development: 'dev.',
};

export const landing = ({ stack, app }: StackContext) => {
	const customDomain: StaticSiteDomainProps = {
		domainName: getDomainNameByStage(landingAlias[app.stage as never]),
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
