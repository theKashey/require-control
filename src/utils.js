function forAllJS(callback) {
  callback('.js');
  callback('.jsx');
}

exports.forAllJS = forAllJS;