import { useEffect, useState } from 'react';

const useScroll = (initialValue = 0) => {
	const { scrollY: windowScrollY = initialValue } =
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
