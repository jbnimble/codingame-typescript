# codingame-typescript
TypeScript code and library for codingame

Heavily based on the the example at [marzelin/codingame](https://github.com/marzelin/codingame). Without this example I could not have quickly gotten up and running, so thanks!

Requires having npm and node installed, run these commands to pull dependencies, create the JavaScript to run in codingame and execute the tests.
```bash
# get dependencies from npm
npm install
# build code in development mode
npm run dev
# build code in production mode
npm run build
# run unit tests
npm run test
```

After the build, the JavaScript file will be in the `out` directory and can be synced to the [codingame](https://www.codingame.com) IDE.
