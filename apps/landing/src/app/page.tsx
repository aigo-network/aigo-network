'use client';

import { Fragment } from 'react';

import About from './section/About';
import Backers from './section/Backers';
import Banner from './section/Banner';
import Ecosystem from './section/Ecosystem';
import Footer from './section/Footer';
import Header from './section/Header';
// import Highlight from './section/Highlight';
// import News from './section/News';
import StrategicPartner from './section/Strategic';
import HowItWork from './section/Work';

export default function Home() {
	return (
		<Fragment>
			{/* <Highlight /> */}
			<Header />
			<main>
				<Banner />
				<About data="AiGO Network is committed to create a comprehensive go-to solution to all mobility scenarios guiding urban planning, enhancing traffic efficiency, automobile and navigation in the 21st century  — ultimately creating a more livable and sustainable world." />
				<HowItWork />
				<Ecosystem />
				<StrategicPartner />
				{/* <News /> */}
				<Backers />
			</main>
			<Footer />
		</Fragment>
	);
}
