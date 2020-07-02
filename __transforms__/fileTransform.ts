// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  process(_src, filename) {
    const assetName = JSON.stringify(path.basename(filename));

    if (assetName.match(/\.svg/)) {
      return ` module.exports = 'Icon src=${assetName}'`;
    }

    return 'module.exports = ' + assetName + ';';
  },
};
