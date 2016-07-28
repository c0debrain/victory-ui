angular.module("app.environment", [])
.constant("environment", {
  "api": {
    "path": "http://localhost:3000/v1",
    "protocol": "http",
    "host": "localhost",
    "version": "v1",
    "port": "3000",
    "key": "development"
  },
  "dashboard": {
    "path": "http://localhost:3001/",
    "protocol": "http",
    "host": "localhost",
    "environment": "development",
    "port": "3001"
  }
});
