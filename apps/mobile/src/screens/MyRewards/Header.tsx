import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CenterScreenHeader from 'components/CenterScreenHeader';
import { defaultTheme } from 'utils/global';

export enum TabId {
	ACTIVE = 'ActiveRewards',
	PAST = 'PastRewards',
}

interface Props {
	activeTabId: TabId;
	onTabSelect: (tabId: TabId) => void;
}

const Header: FC<Props> = ({ activeTabId, onTabSelect }) => {
	const { top } = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingTop: top + 20 }]}>
			<CenterScreenHeader title={'My rewards'} />
			<View style={styles.tabContainer}>
				<TouchableOpacity
					style={[styles.tab, activeTabId === TabId.ACTIVE && styles.activeTab]}
					onPress={() => onTabSelect(TabId.ACTIVE)}
				>
					<Text
						style={[
							styles.tabLabel,
							activeTabId === TabId.ACTIVE && styles.activeTabLabel,
						]}
					>
						Active rewards
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab, activeTabId === TabId.PAST && styles.activeTab]}
					onPress={() => onTabSelect(TabId.PAST)}
				>
					<Text
						style={[
							styles.tabLabel,
							activeTabId === TabId.PAST && styles.activeTabLabel,
						]}
					>
						Past rewards
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultTheme.bgLight,
	},
	titleContainer: {
		paddingHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		flex: 1,
		textAlign: 'center',
		fontSize: 18,
		lineHeight: 24,
		fontWeight: '600',
		color: defaultTheme.textDark90,
	},
	backButton: {
		flex: 1,
	},
	tabContainer: {
		flexDirection: 'row',
		marginTop: 10,
	},
	tab: {
		flex: 1,
		marginHorizontal: 16,
		paddingVertical: 16,
		alignItems: 'center',
	},
	tabLabel: {
		fontWeight: '600',
		color: defaultTheme.textDark70,
	},
	activeTab: {
		borderBottomColor: defaultTheme.cta100,
		borderBottomWidth: 2,
	},
	activeTabLabel: {
		fontWeight: '700',
		color: defaultTheme.cta100,
	},
});
