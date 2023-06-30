const fs = require('fs');
const glob = require('glob');

const searchValue = '\/assets';
const replaceValue = '.\/.\/assets';

glob('dist/ldf/styles.*.css', {}, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach(file => {
    let css = fs.readFileSync(file, 'utf8');
    css = css.replace(new RegExp(searchValue, 'g'), replaceValue);
    fs.writeFileSync(file, css);
  });
});







