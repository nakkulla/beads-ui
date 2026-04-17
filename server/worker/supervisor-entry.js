import { createWorkerSupervisorServer } from './supervisor.js';

const root_dir = process.cwd();
const host = process.env.BDUI_WORKER_SUPERVISOR_HOST || '127.0.0.1';
const port = process.env.BDUI_WORKER_SUPERVISOR_PORT
  ? Number.parseInt(process.env.BDUI_WORKER_SUPERVISOR_PORT, 10)
  : 0;

const runtime = createWorkerSupervisorServer({ root_dir, host, port });
runtime.start().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
