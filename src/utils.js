const allJS = [
  '.js',
  '.jsx'
];

const allCSS = [
  '.css',
  '.less',
  '.scss',
];

const allHookable = [
  ...allJS,
  ...allCSS,
]

function forAllJS(callback) {
  allJS.forEach(callback);
}

exports.allJS = allJS;
exports.allCSS = allCSS;
exports.allHookable = allHookable;

exports.forAllJS = forAllJS;