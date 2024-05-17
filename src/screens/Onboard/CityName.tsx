import { useEffect, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import SearchBox from 'components/SearchBox';
import SearchResult from 'components/SearchResult';
import citiesList from 'utils/cities.json';

import OnboardLayout from './OnboardLayout';

interface CitiesData {
	name: string;
	country: string;
	subcountry: string;
	geonameid: number;
}

const citiesDataList: CitiesData[] = citiesList;

const searchRenderItem: ListRenderItem<CitiesData> = ({ item }) => {
	return (
		<View style={{
			height: 30,
		}}>
			<Text>{`${item.name}, ${item.subcountry} ${item.country}`}</Text>
		</View>
	);
};

export const CityName = () => {
	const [searchText, setSearchText] = useState('');
	const [listCitiesFiltered, setListCitiesFiltered] = useState<CitiesData[]>(
		[],
	);
	const onSearchChange = (searchText: string) => {
		setSearchText(searchText);
	};

	useEffect(() => {
		const filtered = citiesDataList.filter((item) => {
			if (!searchText) {
				return false;
			} else {
				return item.name.includes(searchText);
			}
		});
		setListCitiesFiltered(filtered);
	}, [searchText]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.keyboardContainer}
		>
			<OnboardLayout
				disabled
				onPress={() => {}}
				title="Name your city"
				subTitle="Mark yourself in your city to connect with pals"
				screenOrder={3}
			>
					<View style={styles.searchContainer}>
						<SearchBox style={styles.searchBox} onChangeText={onSearchChange} />
						<KeyboardAvoidingView
							behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						>
							<SearchResult
								style={styles.searchResult}
								data={listCitiesFiltered}
								renderItem={searchRenderItem}
							/>
						</KeyboardAvoidingView>
					</View>
			</OnboardLayout>
		</KeyboardAvoidingView>
	);
};

export default CityName;

const styles = StyleSheet.create({
	keyboardContainer: {
		flex: 1,
	},
	searchContainer: {
		paddingVertical: 30,
		gap: 10,
	},
	searchBox: {
		marginHorizontal: 25,
	},
	searchResult: {
		marginHorizontal: 25,
	},
});
