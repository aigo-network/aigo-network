import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBox from 'components/SearchBox';
import type { CitiesData } from 'components/SearchResult';
import SearchResult from 'components/SearchResult';
import { appActions, appState } from 'state/app';
import citiesList from 'utils/cities.json';
import { useSnapshot } from 'valtio';

import OnboardLayout from './OnboardLayout';

const citiesDataList: CitiesData[] = citiesList;

export const CityName = () => {
	const { navigate } = useNavigation();
	const {
		onboarding: { city },
	} = useSnapshot(appState);
	const [searchText, setSearchText] = useState('');
	const [listCitiesFiltered, setListCitiesFiltered] = useState<CitiesData[]>(
		[],
	);
	const onSearchChange = (searchText: string) => {
		setSearchText(searchText);
	};
	const onItemSelect = (item: CitiesData) => {
		setSearchText(item.name);
		appActions.updateOnboarding({ city: item.name });
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
				currentIndex={3}
				disabled={!city}
				onPress={() => navigate('Home')}
				title="Name your city"
				subTitle="Mark yourself in your city to connect with pals"
			>
				<View style={styles.searchContainer}>
					<SearchBox
						style={styles.searchBox}
						onChangeText={onSearchChange}
						textSearch={searchText}
					/>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					>
						<SearchResult
							style={styles.searchResult}
							data={listCitiesFiltered}
							textSearch={searchText}
							onItemPress={onItemSelect}
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
