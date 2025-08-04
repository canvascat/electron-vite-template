/// <reference types="vite/client" />

interface Window {
	// expose in the `electron/preload/index.ts`
	electron: import("electron/preload").ExposeElectronAPI;
}
