import Animated, { FadeInDown } from 'react-native-reanimated';
import { Align, showModal } from 'empty-modal';

import RewardModalCore from './RewardModalCore';
import type {
	ConfirmRedemptionConfig,
	FailRedemptionConfig,
	MarkAsUsedConfig,
	SuccessRedemptionConfig,
} from './types';

const showConfirmRedemption = ({
	rewardName,
	points,
	onConfirm,
	onCancel,
}: ConfirmRedemptionConfig) => {
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<RewardModalCore
				onClose={() => {
					onCancel?.();
					cleanModal();
				}}
				title="Confirm redemption?"
				descriptionHighlight={rewardName}
				descriptionPrefix={'You are about to redeem'}
				descriptionSuffix={`for ${points} GO. This action cannot be undone.`}
				highlightButtonText={'Go for it'}
				normalButtonText={'Cancel'}
				onHighlightPress={() => {
					onConfirm?.();
					cleanModal();
				}}
				onNormalPress={() => {
					onCancel?.();
					cleanModal();
				}}
			/>
		</Animated.View>,
		{
			id: 'confirm-redemption',
			closeOnPressBackdrop: false,
			showBackdrop: true,
			align: Align.CenterCenter,
		},
	);
};

const showSuccessRedemption = ({
	rewardName,
	onConfirm,
	onCancel,
}: SuccessRedemptionConfig) => {
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<RewardModalCore
				onClose={() => {
					onCancel?.();
					cleanModal();
				}}
				title={'Awesome!!'}
				descriptionHighlight={rewardName}
				descriptionSuffix={
					'has been redeemed to your account successfully. Enjoy :)'
				}
				highlightButtonText={'View my reward'}
				normalButtonText={'Back to AiGO Rewards'}
				onHighlightPress={() => {
					onConfirm?.();
					cleanModal();
				}}
				onNormalPress={() => {
					onCancel?.();
					cleanModal();
				}}
				lottieEnable
			/>
		</Animated.View>,
		{
			id: 'success-redemption',
			closeOnPressBackdrop: false,
			showBackdrop: true,
			align: Align.CenterCenter,
		},
	);
};

const showFailRedemption = ({ onConfirm, onCancel }: FailRedemptionConfig) => {
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<RewardModalCore
				onClose={() => {
					onCancel?.();
					cleanModal();
				}}
				title={'Oops! Not enough GO'}
				descriptionPrefix={
					'Try other rewards or earn more GO point through different activities with us'
				}
				highlightButtonText={'Earn more GO point'}
				normalButtonText={'Back to AiGO Rewards'}
				onHighlightPress={() => {
					onConfirm?.();
					cleanModal();
				}}
				onNormalPress={() => {
					onCancel?.();
					cleanModal();
				}}
			/>
		</Animated.View>,
		{
			id: 'fail-redemption',
			closeOnPressBackdrop: false,
			showBackdrop: true,
			align: Align.CenterCenter,
		},
	);
};

const showMarkAsUsed = ({ onConfirm, onCancel }: MarkAsUsedConfig) => {
	const { cleanModal } = showModal(
		<Animated.View entering={FadeInDown}>
			<RewardModalCore
				onClose={() => {
					onCancel?.();
					cleanModal();
				}}
				title={'Mark as used?'}
				descriptionPrefix={
					'Only confirm if you already use this reward because this action cannot be undone.'
				}
				highlightButtonText={'Yes, I already used this'}
				normalButtonText={'Cancel'}
				onHighlightPress={() => {
					onConfirm?.();
					cleanModal();
				}}
				onNormalPress={() => {
					onCancel?.();
					cleanModal();
				}}
			/>
		</Animated.View>,
		{
			id: 'mark-as-used',
			closeOnPressBackdrop: false,
			showBackdrop: true,
			align: Align.CenterCenter,
		},
	);
};

export {
	showConfirmRedemption,
	showFailRedemption,
	showMarkAsUsed,
	showSuccessRedemption,
};
