import type { FC } from 'react';
import { useMemo } from 'react';

import DesktopInner from './DesktopInner';
import MobileInner from './MobileInner';
import { getStore } from './shared';

import { isMobileBrowser } from '@/utils/helper';

interface Props {
	playStore: string;
	appStore: string;
}

export const ShowAppDownloadModal: FC<Props> = ({ playStore, appStore }) => {
	const stores = useMemo(() => getStore(), []);

	return isMobileBrowser() ? (
		<MobileInner stores={stores} appStore={appStore} playStore={playStore} />
	) : (
		<DesktopInner stores={stores} appStore={appStore} playStore={playStore} />
	);
};

export default ShowAppDownloadModal;
