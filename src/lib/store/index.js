import { writable } from 'svelte/store';
import { nanoid } from 'nanoid';

const me = nanoid();

export const createChannelStore = () => {
	const { subscribe, set, update } = writable( [] );

	const eventSource = new EventSource(
		//`http://localhost:4110/events/${ me }`,
		`http://ec2-34-220-203-82.us-west-2.compute.amazonaws.com:4110/events/${ me }`
	);

	eventSource.onmessage = e => {
		update( messages => messages.concat( JSON.parse( e.data ) ) );
	};

	return {
		subscribe,
		reset: () => set( [] ),
		close: eventSource.close,
	};
};