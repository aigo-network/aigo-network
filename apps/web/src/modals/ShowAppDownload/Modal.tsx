import { type FC, useMemo } from 'react';
import { useSnapshot } from 'valtio';

import DesktopInner from './DesktopInner';
import MobileInner from './MobileInner';
import { getDownloadLinks } from './shared';

import { appState } from '@/state/app';
import { isMobileBrowser } from '@/utils/helper';

export const ShowAppDownloadModal: FC = () => {
	const { user } = useSnapshot(appState);
	const downloadLinks = useMemo(() => getDownloadLinks(user as never), [user]);

	return isMobileBrowser() ? (
		<MobileInner links={downloadLinks} />
	) : (
		<DesktopInner user={user as never} links={downloadLinks} />
	);
};

export default ShowAppDownloadModal;
