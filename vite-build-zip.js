const compressing = require('compressing');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const resolve = (dir) => path.join(__dirname, './', dir);
const releasePath = resolve('release');

// 判断是否存在当前release路径，没有就新增
if (!fs.existsSync(releasePath)) {
  fs.mkdirSync(releasePath);
}
const build = () => {
  // 注意返回的字符串带回车，要替换掉
  const branchName = execSync('git symbolic-ref --short -q HEAD', {
    encoding: 'utf8',
  }).replace(/[\r\n]/g, '');
  const zipName = `release/alamein-merchant-data-h5-release-${branchName}${Date.now()}.zip`;
  compressing.zip
    .compressDir(resolve('dist'), resolve(zipName), {
      ignoreBase: 'ignoreBase',
    })
    .then(() => {
      console.log(`Tip: 文件压缩成功，已压缩至【${zipName}】`);
    })
    .catch(() => {
      console.log('Tip: 压缩报错');
    });
};
build();
