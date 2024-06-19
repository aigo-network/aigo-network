import type { FC } from 'react';

import cssStyle from '../page.module.css';

const ReferralHistory: FC = () => {
	return (
		<div className={cssStyle.referralHistory}>
			<p className={cssStyle.title}>HISTORY REFERRAL</p>
			<div className={cssStyle.grid}></div>
		</div>
	);
};

export default ReferralHistory;
