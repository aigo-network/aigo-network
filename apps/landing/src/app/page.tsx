'use client';

import { Fragment, useLayoutEffect, useRef, useState } from 'react';

import About from './section/About';
import Backers from './section/Backers';
import Banner from './section/Banner';
import Ecosystem from './section/Ecosystem';
import Footer from './section/Footer';
import Header from './section/Header';
import MapEmbedding from './section/MapEmbedding';
// import Highlight from './section/Highlight';
// import News from './section/News';
import StrategicPartner from './section/Strategic';
import HowItWork from './section/Work';

export default function Home() {
	const headerRef = useRef<{ offsetHeight: number } | null>(null);
	const [headerHeight, setHeaderHeight] = useState(0);

	useLayoutEffect(() => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.offsetHeight);
		}
	}, [headerRef.current?.offsetHeight]);

	return (
		<Fragment>
			{/* <Highlight /> */}
			<Header ref={headerRef} />
			<main>
				<Banner headerHeight={headerHeight} />
				<About data="AiGO Network is committed to create a comprehensive go-to solution to all mobility scenarios guiding urban planning, enhancing traffic efficiency, automobile and navigation in the 21st century  — ultimately creating a more livable and sustainable world." />
				<MapEmbedding />
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
