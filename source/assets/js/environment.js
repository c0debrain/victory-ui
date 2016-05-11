angular.module("app.env", [])
.constant("env", {
  "api": "localhost",
  "api_key": "development",
  "api_version": "v1",
  "node_env": "development",
  "node_port": "3001"
});
