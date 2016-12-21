# NOC Dashboard
Network operations center dashboard that displays important information regarding the various hardware and software deployments that are embodied by the OneLink service.

## Installation
You will need NodeJS installed on your operating system. The [node installation](https://nodejs.org/en/download/package-manager/) should come pre-packaged with NPM (Node Package Manager) which we will use to install our dependencies.

## Setup
To get the project up and running, run the following command, it will install all of the node server's dependencies in a directory named `node_modules`. The dependencies and what versions that should be installed are enumerated in a file called `package.json` in the root directory. Afterwards the command will automatically run the command `bower install` which will install the dashboard's front end dependencies (Angular, Bootstrap, jQuery, ect).
```
npm install
```
