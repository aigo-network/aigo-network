import { Text, TextInput } from 'react-native';
import { setDefaultProps } from '@aigo/config';

import { interTight } from './style';

setDefaultProps(Text, {
	style: {
		fontFamily: interTight.style.fontFamily,
		color: '#fff',
	},
});
setDefaultProps(TextInput, {
	style: {
		fontFamily: interTight.style.fontFamily,
		color: '#fff',
	},
});
