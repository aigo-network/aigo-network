export async function GET() {
	return Response.json(associatedAppleAppSite);
}

const associatedAppleAppSite = {
	applinks: {
		details: [
			{
				appIDs: [APPLE_APP_ID],
				components: [
					{ '/': '/open', comment: 'Open Ride App' },
				],
			},
		],
	},
	webcredentials: {
		apps: [APPLE_APP_ID],
	},
};