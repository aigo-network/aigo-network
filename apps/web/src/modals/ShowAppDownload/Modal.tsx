import type { FC } from 'react';

import DesktopInner from './DesktopInner';
import MobileInner from './MobileInner';

import { isMobileBrowser } from '@/utils/helper';

export const ShowAppDownloadModal: FC = () => {
	return isMobileBrowser() ? <MobileInner /> : <DesktopInner />;
};

export default ShowAppDownloadModal;
