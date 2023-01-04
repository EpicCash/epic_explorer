# Epic Explorer v3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Follow below guide lines to deploy explorerv3

* Create new folder, pull project from git and switch to "explorerv3" branch
* Copy below 3 files from old live to this project
```
.env
src/environment.ts
src/environment.prod.ts
```
* Run below command to install node modules
```
npm i -f --ignore-script
```
* Run below command to create build
```
npm run build:ssr
```
* Use below command to run build
```
node live/server.js
```
Note : if you are using pm2 or other process manager, use specific command to run build