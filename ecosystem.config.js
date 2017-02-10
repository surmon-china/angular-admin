module.exports = {
  apps: [
    {
      name: "admin.surmon.me",
      watch: true,
      script: "npm",
      args: "run server:prod",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "/usr/local/wwwlogs/angular-admin/error.log",
      out_file: "/usr/local/wwwlogs/angular-admin/out.log"
    }
  ]
}