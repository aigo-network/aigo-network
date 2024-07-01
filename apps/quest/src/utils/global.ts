import { Text, TextInput } from 'react-native';
import { setDefaultProps } from '@aigo/config';

import { dmSans } from './style';

setDefaultProps(Text, {
	style: {
		fontFamily: dmSans.style.fontFamily,
		color: '#fff',
	},
});
setDefaultProps(TextInput, {
	style: {
		fontFamily: dmSans.style.fontFamily,
		color: '#fff',
	},
});
