/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StyleProp, TextStyle } from 'react-native';
import { Platform, StyleSheet } from 'react-native';

const WeightMap = {
	normal: 'Regular',
	bold: 'Bold',
	ultralight: 'ExtraLight',
	thin: 'Thin',
	light: 'Light',
	medium: 'Medium',
	regular: 'Regular',
	semibold: 'SemiBold',
	condensedBold: 'SemiBold',
	condensed: 'SemiBold',
	heavy: 'Bold',
	black: 'Black',
	'100': 'Thin',
	'200': 'ExtraLight',
	'300': 'Light',
	'400': 'Regular',
	'500': 'Medium',
	'600': 'SemiBold',
	'700': 'Bold',
	'800': 'ExtraBold',
	'900': 'Black',
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const setDefaultProps = (Component: any, defaultProps: any) => {
	const componentRender = Component.render;
	if (!componentRender) {
		Component.defaultProps = defaultProps;
		return;
	}

	Component.render = (props: any, ref: any) => {
		props = {
			...defaultProps,
			...props,
			style: [defaultProps.style, props.style],
		};

		if (Platform.OS === 'android') {
			const {
				fontFamily = 'Lato',
				fontWeight = '400',
				fontStyle,
			} = StyleSheet.flatten(props.style as StyleProp<TextStyle>);
			const italic = fontStyle === 'italic' ? 'Italic' : '';
			const finalFontFamily = `${fontFamily}-${WeightMap[fontWeight]}${italic}`;
			const injectedFontStyle = {
				fontFamily: finalFontFamily,
				fontWeight: 'normal',
				fontStyle: 'normal',
			};
			props.style.push(injectedFontStyle);
		}

		return componentRender.call(this, props, ref);
	};
};
