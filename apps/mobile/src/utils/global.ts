import { Text, TextInput } from 'react-native';
import { setDefaultProps } from '@aigo/config';

export const defaultTheme = {
	bgLight: '#ffffff',
	bgGray1: '#f8fafb',
	bgGray2: '#f0f2f3',
	bgGray3: '#ebebeb',
	textLight: '#fdfdfd',
	textDark100: '#000000',
	textDark90: '#171717',
	textDark80: '#464646',
	textDark70: '#5e5e5e',
	textDark60: '#757575',
	textDark50: '#8c8c8c',
	textDark30: '#bbbbbb',
	textDark20: '#d3d3d3',
	textDark10: '#EAEAEA',
	cta100: '#34c3f4',
	cta40: '#aee7fb',
	cta30: '#c2edfc',
	cta20: '#D6F3FD',
	cta12: '#e7f8fe',
	cta10: '#ebf9fe',
	gray20: '#f1f2f3',
	gray10: '#f8fafb',
	red: '#d84a4a',
	inputBorder: '#cbd5e1',
};

setDefaultProps(Text, {
	style: {
		fontFamily: 'Lato',
		color: defaultTheme.textLight,
	},
});
setDefaultProps(TextInput, {
	style: {
		fontFamily: 'Lato',
		color: defaultTheme.textDark90,
	},
});
