import {writable} from 'svelte/store';

export const authenticatedStore = writable(false);
export const autoFocusStore = writable(false);
export const darkModeStore = writable(false);
