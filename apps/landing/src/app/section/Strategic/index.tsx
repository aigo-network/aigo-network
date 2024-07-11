import { useEffect, useRef } from 'react';

import StrategicCard from './StrategicCard';

import SectionLayout from '@/components/SectionLayout';
import { scrollMap, SectionId } from '@/utils/scrollTo';

const StrategicPartner = () => {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		if (ref.current) {
			console.log(ref.current);
			scrollMap[SectionId.Partner] = ref;
		}
	}, [ref.current]);

	return (
		<SectionLayout
			innerRef={ref}
			subTitle="Strategic Partnership"
			title="APAC market growth & expansion"
		>
			<StrategicCard />
		</SectionLayout>
	);
};

export default StrategicPartner;
