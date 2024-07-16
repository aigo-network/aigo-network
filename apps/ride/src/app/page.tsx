import Link from 'next/link';

export default function Home() {
	return (
		<div className="container">
			<h1>AiGO Ride</h1>
			<p>Coming soon!</p>
			<Link className="button" href={'/open?from=ride.aigo.network'}>
				Open App
			</Link>
		</div>
	);
}
