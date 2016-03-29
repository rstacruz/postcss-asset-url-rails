var postcss = require('postcss')
var valueParser = require('postcss-value-parser')

var types = ['asset', 'image', 'font']

/*
 * Plugin to transform `asset-url(...)` to `url(<%= asset_path(...) %>)`
 */

module.exports = postcss.plugin('postcss-asset-url-rails', function () {
  return function (style) {
    style.walkDecls(function transformDecl(decl) {
      if (!decl.value) return
      if (hasUrlHelper(decl.value)) decl.value = transformUrl(decl.value)
    })
  }
})

/*
 * Checks if a given declaration value has a Rails helper in it
 *
 *     isUrlHelper('asset-url("x")') => true
 */

function hasUrlHelper (value) {
  for (var i = 0, len = types.length; i < len; i++) {
    if (value.indexOf('' + types[i] + '-url(') !== -1) return true
  }
}

function isUrlHelper (value) {
  for (var i = 0, len = types.length; i < len; i++) {
    if ('' + types[i] + '-url' === value) return true
  }
}


/*
 * Transforms URL helpers
 *
 *     "asset-url('hi.jpg')"
 *     => "url(<%= asset_path('hi.jpg') %>)"
 */

function transformUrl (value) {
  var v = valueParser(value)
  v.walk(function (node) {
    if (node.type === 'function' && isUrlHelper(node.value)) {
      // node.nodes === [ { type: 'string', value: 'lmao' } ]
      var url = node.nodes[0].value
      var helper = node.value.replace('-url', '_path') /* 'asset_url' */
      node.value = 'url'
      node.nodes[0] = {
        type: 'string',
        value: '<%= ' + helper + '(' + JSON.stringify(url) + ') %>'
      }
    }
  })
  return v.toString()
}
