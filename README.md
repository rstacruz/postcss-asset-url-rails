# postcss-asset-url-rails

> Transform Rails asset helpers to ERB syntax using [postcss][]

postcss-asset-url-rails converts Rails's [asset pipeline helpers](http://guides.rubyonrails.org/asset_pipeline.html) into Rails's ERB syntax. This allows you to build CSS files using postcss outside Rails, output them as `.css.erb` for use in the Rails asset pipeline. It takes `asset-url(...)` values and turns them into `url(<%= asset_path(...) %>)`.

```erb
/* Input:  */  div { background: asset-url("hello.jpg") }
/* Output: */  div { background: url(<%= asset_path("hello.jpg") %>) }
```

[postcss]: https://github.com/postcss/postcss

<br>

## Usage with Brunch

`postcss-asset-url-rails` is used like any other postcss plugin. If you're using Brunch, that's simply adding it using [postcss-brunch](https://www.npmjs.com/package/postcss-brunch):

```
npm install --save-dev postcss-brunch postcss-asset-url-rails
```

```js
/* brunch-config.js */
plugins: {
  postcss: {
    processors: [
      require('postcss-asset-url-rails')()
    ]
```

<br>

## Also see

- [npm-pipeline-rails][] allows you to use npm tools to build files for your asset pipeline.
- [postcss-rails-asset-urls][] is (completely different) plugin that turns `url()` into `asset-url()`, which may be used with this package.
 
[postcss-rails-asset-urls]: https://github.com/ryanbahniuk/postcss-rails-asset-urls
[npm-pipeline-rails]: https://github.com/rstacruz/npm-pipeline-rails

## Thanks

**postcss-asset-url-rails** © 2016+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/postcss-asset-url-rails/contributors
