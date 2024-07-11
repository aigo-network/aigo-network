import type { RefObject } from 'react';

export enum SectionId {
	About = 'about',
	Ecosystem = 'ecosystem',
	Partner = 'partner',
}

export const scrollMap: Record<SectionId, RefObject<HTMLElement> | null> = {
	about: null,
	ecosystem: null,
	partner: null,
};

export const scrollTo = (id: SectionId) => {
	const sectionRef = scrollMap[id];

	if (!sectionRef?.current) return;

	sectionRef?.current.scrollIntoView({ behavior: 'smooth' });
};
