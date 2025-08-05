import { createTIPCClient } from "tipc-electron/renderer";
import type { Functions } from "../../electron/main/functions";

const tipc = createTIPCClient<Functions>(window.electron.ipcRenderer);

export default tipc;
