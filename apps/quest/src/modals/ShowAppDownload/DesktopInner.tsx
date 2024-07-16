import type { FC } from 'react';
import { useMemo, useState } from 'react';
import {
	Linking,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import QrCode from 'react-native-qrcode-svg';

import DownloadButton from './DownloadButton';
import type { StoreOption } from './shared';

interface Props {
	stores: StoreOption[];
	appStore: string;
	playStore: string;
}

export const DesktopInner: FC<Props> = ({ stores, appStore, playStore }) => {
	const [activeStore, setActiveStore] = useState(stores[0]);
	const activeLink = useMemo(
		() => (activeStore.type === 'Android' ? playStore : appStore),
		[activeStore],
	);

	const onDownloadPress = () => {
		Linking.openURL(activeLink);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.qrContainer} onPress={onDownloadPress}>
				<View style={styles.qrInnerContainer}>
					<QrCode value={activeLink} size={200} />
				</View>
			</TouchableOpacity>
			<Text style={styles.middleTxt}>OR</Text>
			<View style={styles.buttonsContainer}>
				{stores.map((item, i) => {
					const isActive = item.title === activeStore.title;

					return (
						<DownloadButton
							key={i}
							style={styles.buttonContainer}
							item={item}
							isActive={isActive}
							onPress={setActiveStore}
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
		gap: 24,
	},
	qrContainer: {
		alignSelf: 'center',
		backgroundColor: '#f2f2f2',
		padding: 24,
		borderRadius: 18,
	},
	qrInnerContainer: {
		borderRadius: 8,
		overflow: 'hidden',
	},
	middleTxt: {
		fontWeight: '700',
		fontSize: 16,
		lineHeight: 24,
		color: '#707174',
		letterSpacing: 16 * 0.02,
		textAlign: 'center',
	},
	buttonsContainer: {
		gap: 12,
	},
	buttonContainer: {
		flex: 1,
	},
});
