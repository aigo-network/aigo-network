import { type FC, useMemo, useState } from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import QrCode from 'react-native-qrcode-svg';
import type { User } from '@aigo/api/sdk';

import DownloadButton from './DownloadButton';
import type { DownloadOption } from './shared';
import { getDownloadLinks } from './shared';

interface Props {
	user?: User;
	links: DownloadOption[];
}

export const DesktopInner: FC<Props> = ({ user, links }) => {
	const [activeLink, setActiveLink] = useState(links[0]);
	const downloadLinks = useMemo(() => getDownloadLinks(user as never), [user]);

	const onDownloadPress = () => {
		Linking.openURL(activeLink.storeUrl);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.qrContainer} onPress={onDownloadPress}>
				<View style={styles.qrInnerContainer}>
					<QrCode value={activeLink.storeUrl} size={200} />
				</View>
			</TouchableOpacity>
			<View style={styles.buttonsContainer}>
				{downloadLinks.map((item, i) => {
					const isActive = item.title === activeLink.title;

					return (
						<DownloadButton
							key={i}
							style={styles.buttonContainer}
							item={item}
							isActive={isActive}
							onPress={setActiveLink}
						/>
					);
				})}
			</View>
		</View>
	);
};

export default DesktopInner;

const styles = StyleSheet.create({
	container: {
		paddingTop: 8,
	},
	qrContainer: {
		alignItems: 'center',
		backgroundColor: '#f2f2f2',
		paddingVertical: 24,
		borderRadius: 18,
	},
	qrInnerContainer: {
		borderRadius: 8,
		overflow: 'hidden',
	},
	buttonsContainer: {
		marginTop: 24,
		flexDirection: 'row',
		gap: 18,
	},
	buttonContainer: {
		flex: 1,
	},
});
