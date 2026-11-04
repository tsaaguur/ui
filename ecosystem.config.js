module.exports = {
  apps: [
    {
      // ui.tsaaguur.mn: built here with `pnpm install --frozen-lockfile && pnpm build`
      name: "trend-ui",
      cwd: __dirname,
      script: ".next/standalone/server.js",
      max_restarts: 10,
      restart_delay: 5000,
      max_memory_restart: "300M",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: { PORT: 3011, HOSTNAME: "127.0.0.1", NODE_ENV: "production" },
    },
  ],
};
