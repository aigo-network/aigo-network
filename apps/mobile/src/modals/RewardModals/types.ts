export type ConfirmRedemptionConfig = {
	rewardName: string;
	points: number;
	onConfirm?: () => void;
	onCancel?: () => void;
};

export type SuccessRedemptionConfig = Omit<ConfirmRedemptionConfig, 'points'>;
export type FailRedemptionConfig = Omit<
	ConfirmRedemptionConfig,
	'rewardName' | 'points'
>;
export type MarkAsUsedConfig = Omit<
	ConfirmRedemptionConfig,
	'rewardName' | 'points'
>;
