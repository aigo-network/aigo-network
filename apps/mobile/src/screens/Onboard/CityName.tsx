import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import SearchBox from 'components/SearchBox';
import type { CitiesData } from 'components/SearchResult';
import SearchResult, { cityToString } from 'components/SearchResult';
import { appActions, appState } from 'state/app';
import citiesList from 'utils/cities.json';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

import OnboardLayout from './OnboardLayout';
import { completeOnboarding } from './shared';

const citiesDataList: CitiesData[] = citiesList;

export const CityName = () => {
	const { reset } = useNavigation();
	const { content, onboarding } = useSnapshot(appState);
	const { city } = onboarding;
	const {
		title,
		description,
		continueButton,
		searchPlaceholder,
		emptySearchTitle,
		emptySearchMessage,
	} = content.screens.onboard.city;
	const [searchText, setSearchText] = useState('');
	const [listCitiesFiltered, setListCitiesFiltered] = useState<CitiesData[]>(
		[],
	);

	const onSearchChange = (searchValue: string) => {
		setSearchText(searchValue);
	};

	const onItemSelect = (item: CitiesData) => {
		const city = cityToString(item);
		setSearchText(city);
		appActions.updateOnboarding({ city });
	};

	const handleCompleteOnboarding = async () => {
		try {
			await completeOnboarding(searchText);
			reset({ routes: [{ name: 'BottomTab', params: { screen: 'Home' } }] });
		} catch (error) {
			crashlytics().recordError(error as Error);
			console.log('Failed to complete onboarding: ', error);
		}
	};

	useEffect(() => {
		const filtered = citiesDataList.filter((item) => {
			const lowerCaseSearch = searchText.toLowerCase();
			if (!searchText) {
				return false;
			} else {
				return (
					item.name.toLowerCase().includes(lowerCaseSearch) ||
					lowerCaseSearch === cityToString(item).toLowerCase()
				);
			}
		});
		setListCitiesFiltered(filtered);
	}, [searchText]);

	useEffect(() => {
		setSearchText(city || '');
	}, [city]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.keyboardContainer}
		>
			<OnboardLayout
				currentIndex={3}
				disabled={!searchText?.length}
				onPress={handleCompleteOnboarding}
				title={title}
				subTitle={description}
				mainBtnText={continueButton}
			>
				<View style={styles.searchContainer}>
					<SearchBox
						containerStyle={styles.searchBox}
						onChangeText={onSearchChange}
						textSearch={searchText}
						placeholder={searchPlaceholder}
						placeholderTextColor={defaultTheme.textDark30}
						iconColor={defaultTheme.textDark30}
						autoFocus
					/>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					>
						<SearchResult
							style={styles.searchResult}
							data={listCitiesFiltered}
							textSearch={searchText}
							emptySearchTitle={emptySearchTitle}
							emptySearchMessage={emptySearchMessage}
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
