import type { FC } from 'react';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Button from 'components/Button';
import SafeContainer from 'components/SafeContainer';
import SearchBox from 'components/SearchBox';
import dialCode from 'utils/dialCode.json';

import type { CountryItem } from './SelcetionItem';
import { SelectionItem } from './SelcetionItem';

interface Props {
	onClose?: () => void;
	onItemSelect?: (item: CountryItem) => void;
}

const CountrySelectionModal: FC<Props> = ({ onClose, onItemSelect }) => {
	const [searchText, setSearchText] = useState('');
	const handleItemSelect = (item: CountryItem) => {
		onItemSelect?.(item);
		onClose?.();
	};
	const listData = dialCode.filter((item) => {
		if (searchText) {
			return item.name.toLowerCase().includes(searchText.toLowerCase());
		} else {
			return item;
		}
	});

	return (
		<View style={styles.container}>
			<SafeContainer style={{ paddingTop: 0 }}>
				<View style={styles.contentContainer}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Country Code</Text>
					</View>
					<SearchBox
						containerStyle={styles.searchBox}
						inputStyle={styles.searchBoxInput}
						iconColor="#7c969e"
						textSearch={searchText}
						placeholder="Search Countries"
						placeholderTextColor="#7c969e"
						onChangeText={(text) => {
							setSearchText(text);
						}}
					/>
					<FlatList
						style={styles.listContainer}
						data={listData}
						renderItem={({ item }) => {
							return (
								<SelectionItem item={item} onItemSelect={handleItemSelect} />
							);
						}}
						ItemSeparatorComponent={() => {
							return <View style={styles.listSeparator} />;
						}}
					/>
					<Button style={styles.btn} onPress={onClose}>
						<Text style={styles.btnText}>Cancel</Text>
					</Button>
				</View>
			</SafeContainer>
		</View>
	);
};

export default CountrySelectionModal;

const styles = StyleSheet.create({
	container: {
		height: 650,
		backgroundColor: '#375f6b',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	contentContainer: {
		flex: 1,
		gap: 20,
	},
	titleContainer: {
		borderBottomWidth: 1,
		borderBottomColor: '#7c969e',
	},
	title: {
		paddingVertical: 15,
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '600',
		lineHeight: 20,
	},
	searchBox: {
		marginHorizontal: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
		borderColor: '#bdc9ce',
	},
	searchBoxInput: {
		color: '#002a3b',
	},
	listContainer: {
		marginHorizontal: 20,
	},
	listSeparator: {
		borderBottomWidth: 1,
		borderBottomColor: '#7c969e',
	},
	btn: {
		backgroundColor: '#597781',
		marginHorizontal: 20,
		paddingVertical: 20,
		borderRadius: 50,
	},
	btnText: {
		fontSize: 18,
		fontWeight: '700',
	},
});
