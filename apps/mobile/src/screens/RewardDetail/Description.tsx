import { StyleSheet, Text, View } from 'react-native';
import { appState } from 'state/app';
import { defaultTheme } from 'utils/global';
import { useSnapshot } from 'valtio';

const Description = () => {
	const { content } = useSnapshot(appState);

	return (
		<View style={styles.container}>
			<Text style={styles.normalText}>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi,
				voluptas quibusdam! Quam dolores quas, esse beatae suscipit dolorem iure
				fugiat magni temporibus! Eos cum, cumque ipsum deleniti dolorum ab
				quaerat suscipit repellat veritatis, quas quia. At odit veritatis soluta
				magnam dolores, mollitia voluptas architecto facilis id quae veniam!
				Rerum, non.
			</Text>

			<Text style={[styles.normalText, styles.highlightText]}>
				{'\n'}
				{content.screens.reward.rewardsDetail.termAndCondition}
			</Text>

			<Text style={styles.normalText}>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
				tempore blanditiis quia sit eligendi eaque, explicabo beatae magnam
				consequuntur unde laboriosam facere? Repellat voluptatibus laudantium
				nisi deserunt corporis cumque fugiat doloribus quae, quam temporibus
				aperiam tempora sit quisquam impedit nobis suscipit soluta at tenetur ut
				doloremque ex totam, aliquam modi perferendis. Inventore pariatur quod,
				odit eos dolor suscipit porro animi in hic dolore doloremque beatae
				possimus maiores vel cum fuga ab rem molestiae nemo. Eius, vitae! Nisi
				ratione facilis sapiente dolores error architecto accusamus
				necessitatibus placeat, aperiam culpa neque expedita, quae repellat
				suscipit unde quibusdam earum qui. Exercitationem, incidunt aut.
			</Text>
		</View>
	);
};

export default Description;

const styles = StyleSheet.create({
	container: {
		marginTop: 24,
	},
	normalText: {
		marginHorizontal: 16,
		lineHeight: 24,
		letterSpacing: -0.3,
		color: defaultTheme.textDark90,
	},
	highlightText: {
		fontWeight: '700',
	},
});
