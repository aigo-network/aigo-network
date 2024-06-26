import { Text, TextInput } from 'react-native';
import { setDefaultProps } from '@aigo/config';

import { poppins } from './style';

setDefaultProps(Text, {
	style: {
		fontFamily: poppins.style.fontFamily,
		color: '#fff',
	},
});
setDefaultProps(TextInput, {
	style: {
		fontFamily: poppins.style.fontFamily,
		color: '#fff',
	},
});
