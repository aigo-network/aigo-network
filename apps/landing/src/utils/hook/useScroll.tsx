import { useEffect, useState } from 'react';

const useScroll = () => {
	const { scrollY: windowScrollY = 0 } =
		typeof window !== 'undefined' ? window : {};
	const [scrollY, setScrollY] = useState(windowScrollY);

	useEffect(() => {
		window?.addEventListener('scroll', () => {
			setScrollY(window?.scrollY);
		});

		return () =>
			window?.removeEventListener('scroll', () => {
				setScrollY(window?.screenY);
			});
	}, []);

	return scrollY;
};

export default useScroll;
