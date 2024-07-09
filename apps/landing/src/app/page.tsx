'use client';

import { Fragment } from 'react';

import About from './section/About';
import Backers from './section/Backers';
import Banner from './section/Banner';
import Ecosystem from './section/Ecosystem';
import Footer from './section/Footer';
import Header from './section/Header';
import StrategicPartner from './section/Strategic';
import HowItWork from './section/Work';

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
				<HowItWork />
				<Ecosystem />
				<StrategicPartner />
				<Backers />
			</main>
			<Footer />
		</Fragment>
	);
}
