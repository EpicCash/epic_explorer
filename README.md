# Epic Explorer v3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Follow below guide lines to deploy explorerv3 on Ubuntu 20.04+

1. Clone repository, `cd` into directory

```
git clone https://github.com/EpicCash/epic_explorer.git
cd ./epic_explorer
```

2. Install nvm

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

3. Install NodeJS version through nvm, 10.9 - 10.19 have tested functionally.

```
nvm install 10.19
```

Follow the prompts if you've never installed `nvm` before, to populate PATH, etc

4. Install python 2.7, symlink into `/usr/bin/python`

```
sudo apt install python2.7-dev

# remove existing symlink
sudo rm /usr/bin/python 

# create new symlink using python 2.7
sudo ln -s /usr/bin/python2.7 /usr/bin/pyton
```

5. Install `libpq-dev`

```
sudo apt install libpq-dev
```

6. Install angular/cli v8.0.2, and bundled packages

```
# angular
npm i -g @angular/cli@8.0.2

# dependencies
npm i
```

7. Build and Deploy

```
# build
npm run build:ssr

#deploy
npm run serve:ssr
```


8. Either enter values into the following files, or copy old ones from previous instance

```
.env
src/environment.ts
src/environment.prod.ts
```

9. Remove your `python` symlink, and re-link python3

```
sudo rm /usr/bin/python
sudo ln -s /usr/bin/python3 /usr/bin/python
```

10. After the instance is running, use scripts to populate data

These scripts are named `import.sh`, `full_import.sh`, and `migrate.sh`.  You need python3 symlinked to run them.

