import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Card from './Card';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CardInfo<T = any> = T & {
	title: string;
};

type Props<T> = {
	cards: CardInfo<T>[];
	selectedCard?: CardInfo<T>;
	onSelect?: (card: T) => void;
};

export const RadioCards = <T,>({ cards, selectedCard, onSelect }: Props<T>) => {
	const [innerSelectedCard, setInnerSelectedCard] =
		useState<CardInfo<T> | null>(null);

	useEffect(() => {
		setInnerSelectedCard(selectedCard || null);
	}, [selectedCard]);

	return (
		<View style={styles.container}>
			{cards.map((card, index) => {
				return (
					<Card
						key={index}
						onPress={() => {
							setInnerSelectedCard(card);
							onSelect?.(card);
						}}
						style={styles.itemContainer}
						title={card.title}
						chosen={card.title == innerSelectedCard?.title}
					/>
				);
			})}
		</View>
	);
};

export default RadioCards;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 14,
	},
	itemContainer: {
		flex: 1,
	},
});
