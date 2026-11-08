module.exports = {
  apps: [
    {
      // ui.tsaaguur.mn: built here with `pnpm install --frozen-lockfile && pnpm build`
      name: "tsaaguur-ui",
      cwd: __dirname,
      // the workspace root is the repo, so standalone nests the app under site/
      script: ".next/standalone/site/server.js",
      max_restarts: 10,
      restart_delay: 5000,
      max_memory_restart: "300M",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: { PORT: 3011, HOSTNAME: "127.0.0.1", NODE_ENV: "production" },
    },
  ],
};
