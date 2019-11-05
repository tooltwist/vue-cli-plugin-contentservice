module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      "@babel/runtime-corejs2": "^7.4.5",
      //"@fortawesome/fontawesome-free": "^5.4.2",
      "@tooltwist/vue-contentservice": "^0.2.6",
      "jquery": "^3.4.1",
      "bulma": "^0.7.5",
      "vue-split-panel": "^1.0.4"
    },
    devDependencies: {
      "node-sass": "^4.13.0",
      "sass-loader": "^7.1.0",
    },
  });

  /*
   *  Create example page.
   */
  api.render('./template')


  /*
   *  Update main.js or main.ts
   */
  let initializationCode = `
import ContentService from '@tooltwist/vue-contentservice';

const $ = require('jquery')
window.$ = $
window.jQuery = $

//require('font-awesome/css/font-awesome.min.css')
require('bulma/css/bulma.min.css')
require('@tooltwist/vue-contentservice/dist/vue-contentservice.css')
require('@tooltwist/vue-contentservice/src/assets/css/client.scss')

Vue.use(ContentService, {
  host: 'uat.crowdhound.io',
  version: '2.0',
  apikey: 'API10O0X1NS8FWUTO3FXKN15ZOR09',
  froalaActivationKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxx=='
});

// Import and use Vue Froala lib.
// import VueFroala from 'vue-froala-wysiwyg'
// Vue.use(VueFroala, {
//   attribution: false
// })
`

  api.onCreateComplete(function isCompleted() {

    console.log(`\nIn api.onCreateComplete`);

    // copy and render all files in ./template with ejs
    //api.render('./template')

    /*
     *  Inject initialization into main.js
     */
    const fs = require('fs');
    const ext = api.hasPlugin('typescript') ? 'ts' : 'js';
    const mainPath = api.resolve(`./src/main.${ext}`);

    // Read the file.
    let contentMain = fs.readFileSync(mainPath, { encoding: 'utf-8' });
    const lines = contentMain.split(/\r?\n/g).reverse();

    // Use App2 instead of App
    lines.forEach((line, index) => {
      lines[index] = line.replace(/App/g, 'App2')
    })

    // Add our initialization code after the last import statement
    const lastImportIndex = lines.findIndex(line => line.match(/^import/));
    lines[lastImportIndex] += initializationCode;

    // Write the file back.
    contentMain = lines.reverse().join('\n');
    fs.writeFileSync(mainPath, contentMain, { encoding: 'utf-8' });

    /*
     * Update package.json
     * Remove core-js, as we've added "@babel/runtime-corejs2"
     */
    const packageJsonPath = api.resolve(`./package.json`);
    let contentPackageJson = fs.readFileSync(packageJsonPath, { encoding: 'utf-8' });
    const lines2 = contentPackageJson.split(/\r?\n/g);
    const coreJsIndex = lines2.findIndex(line => line.match(/"core-js":/));
    console.log(`Removing core-js from package.json, line ${coreJsIndex}`)
    lines2.splice(coreJsIndex, 1);
    contentPackageJson = lines2.join('\n');
    fs.writeFileSync(packageJsonPath, contentPackageJson, { encoding: 'utf-8' });
  });

}
