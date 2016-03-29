var test = require('tape')
var postcss = require('postcss')
var plugin = require('./index')

function process (input) {
  return postcss().use(plugin()).process(input, {}).css
}
test('works', function (t) {
  var result = process('div { background: asset-url("xyz.jpg") repeat }')
  t.equal(result, 'div { background: url(<%= asset_path("xyz.jpg") %>) repeat }', 'transforms asset-url')

  var result = process('div { background: image-url("xyz.jpg") repeat }')
  t.equal(result, 'div { background: url(<%= image_path("xyz.jpg") %>) repeat }', 'transforms image-url')

  var result = process('div { background: font-url("xyz.jpg") repeat }')
  t.equal(result, 'div { background: url(<%= font_path("xyz.jpg") %>) repeat }', 'transforms font-url')

  var result = process('div { background: aoeu-url("xyz.jpg") repeat }')
  t.equal(result, 'div { background: aoeu-url("xyz.jpg") repeat }', "doesn't transform url helpers it doesn't know")

  t.end()
})
