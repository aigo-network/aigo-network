'use client';

import { Fragment } from 'react';

import About from './section/About';
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
				<About
					data="AiGO Network is the first Web3-native platform specifically designed to aggregate & monetize mobility data from two-wheeler
towards a smarter, safe and efficient cities"
				/>
				<StrategicPartner />
				<Backers />
			</main>
			<Footer />
		</Fragment>
	);
}
