'use client';

import { Fragment } from 'react';

import Banner from './section/Banner';
import Header from './section/Header';
import StrategicPartner from './section/Strategic';

export default function Home() {
	return (
		<Fragment>
			<Header />
			<main>
				<Banner />
				<StrategicPartner />
			</main>
		</Fragment>
	);
}
