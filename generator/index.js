module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      "@babel/runtime-corejs2": "^7.4.5",
      "bulma": "^0.7.2",
      "jquery": "^3.4.1",
      //"@fortawesome/fontawesome-free": "^5.4.2",
      //"babel-runtime": "^6.26.0",
      //"bulma": "^0.7.5",
      "vue-contentservice": "^0.1.76",
      "vue-split-panel": "^1.0.4"
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
import ContentService from 'vue-contentservice';

require('font-awesome/css/font-awesome.min.css')
require('bulma/css/bulma.min.css')
require('vue-contentservice/dist/vue-contentservice.css')

Vue.use(ContentService, {
  host: 'uat.crowdhound.io',
  version: '2.0',
  apikey: 'API10O0X1NS8FWUTO3FXKN15ZOR09',
  froalaActivationKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxx=='
});`

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
  });

}
