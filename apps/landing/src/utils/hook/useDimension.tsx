import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

const useDimension = () => {
	const [dimension, setDimension] = useState(() => {
		if (typeof window !== 'undefined') {
			return {
				width: window?.innerWidth,
				height: window?.innerHeight,
			};
		} else {
			return {
				width: 0,
				height: 0,
			};
		}
	});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setDimension({
				width: window.innerWidth,
				height: window.innerHeight,
			});

			window.addEventListener(
				'resize',
				debounce(() => {
					setDimension({
						width: window.innerWidth,
						height: window.innerHeight,
					});
				}),
			);

			return () =>
				window.removeEventListener(
					'resize',
					debounce(() => {
						setDimension({
							width: window.innerWidth,
							height: window.innerHeight,
						});
					}),
				);
		}
	}, []);

	return dimension;
};

export default useDimension;
