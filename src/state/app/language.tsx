import { getLocales } from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LangKey } from 'utils/translations';
import { translations } from 'utils/translations';

import { appState } from './shared';

export const initTranslationModule = async () => {
	const selectedLanguage = await AsyncStorage.getItem('language');
	const [defaultLocale] = getLocales();
	const { languageCode } = defaultLocale;

	if (selectedLanguage?.length) {
		setAppLanguage(selectedLanguage as never);
	} else if (languageCode === 'ko') {
		setAppLanguage('kr');
	} else {
		setAppLanguage('en');
	}
};

export const setAppLanguage = async (key: LangKey) => {
	await AsyncStorage.setItem('language', key);
	appState.content = translations[key];
};
