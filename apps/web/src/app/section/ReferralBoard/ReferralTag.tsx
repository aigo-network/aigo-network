import { type FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Copy from '@aigo/components/icon/Copy';
import Tick from '@aigo/components/icon/Tick';

import Tag from '@/components/Tag';

interface Props {
	referralCode: string;
	invited?: boolean;
}

const ReferralTag: FC<Props> = ({ referralCode, invited }) => {
	const [isHovered, setIsHovered] = useState(false);
	const onHover = (hovered: boolean) => {
		setIsHovered(hovered);
	};
	const onPress = () => {
		navigator.clipboard.writeText(referralCode);
	};

	return (
		<View style={{ opacity: invited ? 0.25 : 1 }}>
			<Tag onHover={onHover} onPress={onPress} disabled={invited}>
				<View style={styles.container}>
					<Text style={[styles.code, invited && { color: '#444649' }]}>
						{referralCode}
					</Text>
					<View style={styles.suffixContainer}>
						{invited ? (
							<View style={styles.tickBackground}>
								<Tick width={12} color="#000000" />
							</View>
						) : (
							<Copy
								width={17}
								color={isHovered ? '#81ddfb' : '#707174'}
								fill={isHovered}
							/>
						)}
					</View>
				</View>
			</Tag>
		</View>
	);
};

export default ReferralTag;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 8,
		paddingVertical: 18,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 24,
		width: '100%',
		pointerEvents: 'none',
	},
	code: {
		paddingLeft: 8,
		fontSize: 20,
		fontWeight: '500',
		lineHeight: 28,
		flex: 1,
	},
	suffixContainer: {
		paddingHorizontal: 16,
	},
	used: {
		fontWeight: '700',
		color: '#444649',
		lineHeight: 24,
	},
	tickBackground: {
		borderRadius: 10,
		width: 20,
		height: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#82ddfb',
	},
});
