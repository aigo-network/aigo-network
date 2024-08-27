import { Fragment, useState } from 'react';

import ActiveRewards from './ActiveRewards';
import Header, { TabId } from './Header';
import PastRewards from './PastRewards';

const MyRewardScreen = () => {
	const [activeTab, setActiveTab] = useState<TabId>(TabId.ACTIVE);

	const handleTabSelect = (tabId: TabId) => {
		setActiveTab(tabId);
	};

	return (
		<Fragment>
			<Header activeTabId={activeTab} onTabSelect={handleTabSelect} />
			{activeTab === TabId.ACTIVE ? <ActiveRewards /> : <PastRewards />}
		</Fragment>
	);
};

export default MyRewardScreen;
