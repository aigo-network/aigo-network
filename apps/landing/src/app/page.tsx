'use client';

import { Fragment } from 'react';

import Backers from './section/Backers';
import Banner from './section/Banner';
import Footer from './section/Footer';
import Header from './section/Header';
import StrategicPartner from './section/Strategic';

export default function Home() {
	return (
		<Fragment>
			<Header />
			<main>
				<Banner />
				<StrategicPartner />
				<Backers />
			</main>
			<Footer />
		</Fragment>
	);
}
