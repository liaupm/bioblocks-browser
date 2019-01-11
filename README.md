# Bioblocks browser client

## Prerequisites

This project requires Node 10+ (usage with Node v8 is possible but not guaranteed moving forward).

## Project setup

First, please clone the pxt-blockly repo:
```
cd ..
git clone https://github.com/liaupm/pxt-blockly
```

Afterwards, set up Closure (required by pxt-blockly). Download closure from https://developers.google.com/blockly/guides/modify/web/closure, and lay it out in a directory called closure-library at the same level as the *pxt-blockly* repo you just cloned.

After this is done, you should have the following directory structure:
```
.
..
pxt-blockly/
closure-library/
bioblocks-browser/
(...)
```

Install the node dependencies
```
npm install
```

And also your static server of choice (for example: npm install http-server)

### Compiles and hot-reloads for development
```
npm run serve
```

Additionally, in order to run the Blockly section, the pxt-blockly must be served on port 9000. Using http-server, this can be achieved by running: `http-server . -p 9000` right outside the pxt-blockly folder. The reason it has to be outside is that development mode blockly needs closure-library accessible as well. Serving the entire folder as it is the case for development should NOT be done in production.

### Compiles and minifies for production
```
npm run build
```

Blockly (pxt-blockly) ought to be compiled by using `build.py`, then (this is not yet done) a new workspace.html should be served that links to the proper compressed Blockly files.

### Lints and fixes files
```
npm run lint
```
