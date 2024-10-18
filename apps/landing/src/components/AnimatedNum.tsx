import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

interface BaseProps {
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

interface AnimatedNumProps extends BaseProps {
	target?: number | string;
	formatter?: (num: number) => ReactNode;
	duration?: number;
}
gsap.registerPlugin(CustomEase);
CustomEase.create('superSlowEnd', 'M0,0 C0.05,0.05 0.1,0.99 1,1');

export function AnimatedNum(props: AnimatedNumProps) {
	const { target, formatter, duration = 500 } = props;
	const [number, setNumber] = useState<ReactNode>(0);
	const [prev, setPrev] = useState(0);
	const tweenRef = useRef<gsap.core.Tween>();
	useEffect(() => {
		const obj = { value: prev };
		tweenRef.current = gsap.to(obj, {
			value: target,
			ease: 'superSlowEnd',
			duration: duration / 1000,
			onUpdate() {
				setNumber(formatter ? formatter(obj.value) : obj.value);
				setPrev(obj.value);
			},
		});
	}, [target]);
	useEffect(() => {
		return () => {
			tweenRef.current?.kill(); // 清除动画以防内存泄漏
		};
	}, []);
	return number;
}
