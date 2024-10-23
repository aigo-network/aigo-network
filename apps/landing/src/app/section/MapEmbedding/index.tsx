import './index.css';

export default function MapEmbedding() {
	return (
		<div className="map-container">
			<div className="map-embedding">
				<iframe
					className="map-iframe"
					src="https://depinscan.io/widget/map"
					name="showIframe"
					width="100%"
					height="600px"
				></iframe>
			</div>
		</div>
	);
}
