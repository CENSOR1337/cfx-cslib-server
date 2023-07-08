const cfx = {
	// @ts-ignore
	triggerClientEvent: global.TriggerClientEvent,
};

export function emitClient(eventName: string, target: number | string, ...args: any[]): void {
	return cfx.triggerClientEvent(eventName, target, ...args);
}

export function emitAllClients(eventName: string, ...args: any[]): void {
	return emitClient(eventName, -1, ...args);
}
