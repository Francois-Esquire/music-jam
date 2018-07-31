const { execSync } = require("child_process");

const exec = (cmd, opts) => execSync(cmd, { stdio: "inherit", ...opts });

exec("rollup -c");
