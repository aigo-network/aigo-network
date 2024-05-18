import type { ReactNode } from 'react';
import { proxy } from 'valtio';

export type ModalConfig = {
	id: string;
	showBackdrop?: boolean;
};

export const modalConfigMap = proxy<Record<string, ModalConfig>>({});

export const modalComponentMap: Record<string, ReactNode> = {};

export const showModal = (component: ReactNode, config: ModalConfig) => {
	delete modalComponentMap[config.id];
	delete modalConfigMap[config.id];
	modalComponentMap[config.id] = component;
	modalConfigMap[config.id] = config;

	return {
		cleanModal: () => {
			delete modalComponentMap[config.id];
			delete modalConfigMap[config.id];
		},
	};
};
