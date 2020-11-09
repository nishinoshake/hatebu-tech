const htmlmin = require('html-minifier')

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
      const minified = htmlmin.minify(content, {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      })

      return minified
    }

    return content
  })

  return {
    templateFormats: ['njk'],
    dir: {
      input: 'src',
      output: 'dist'
    }
  }
}
