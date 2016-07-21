FROM raker/noc-dashboard:latest
CMD npm install
CMD bower install
CMD gulp serve
