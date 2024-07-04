'use client';

import { Fragment } from 'react';

import Banner from './section/Banner';
import Header from './section/Header';

export default function Home() {
	return (
		<Fragment>
			<Header />
			<main>
				<Banner />
			</main>
		</Fragment>
	);
}
