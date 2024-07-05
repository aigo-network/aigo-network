import { useEffect, useState } from 'react';

const useScroll = () => {
	const [scrollY, setScrollY] = useState(window.scrollY);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScrollY(window.scrollY);
		});

		return () =>
			window.removeEventListener('scroll', () => {
				setScrollY(window.screenY);
			});
	}, []);

	return scrollY;
};

export default useScroll;
