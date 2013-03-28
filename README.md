# Static Site Build Boilerplate
This is an attempt at automating our static site builds at [Cohaesus](http://www.cohaesus.co.uk).

## Requirements
* Node
* NPM
* bower
* grunt-cli

## Whats Included in the boilerplate?

* [Nick Pack's SCSS fork of Skeleton](https://github.com/nickpack/Skeleton-SCSS)
* Bower managed js dependencies
* SCSS compilation
* Minification and concatenation of JS and CSS
* Templated html via grunt-templater, meaning you can use your favourite node template engine to generate static files
* A number of grunt tasks to speed up development

## Getting started
1. Install node and npm
2. Use npm to install grunt-cli and bower
3. Run npm install from the root, to install all of the build dependencies
4. Run bower install from the root to add common js libraries to the project (currently jQuery and modernizr)
5. Run grunt build to build the initial set of files (You should see these in the build directory once it completes it)
6. Run grunt watch to trigger builds on file changes
7. Hack till your heart is content, and build some awesome shit.

## Configured Grunt Tasks
* Concat - Concatenates third party libs into one file, and project specific js into another
* uglify - Minifies afore mentioned files via uglify
* jshint - Lint project js files
* sass - Compile SCSS files into one project CSS file
* csslint - lint CSS syntax
* cssmin - Minify project css file
* template - Compile static HTML versions of semi-dynamic templates
* copy - Place all project related files in the build directory
* watch - Watch for changes and rebuild
* lint - Run jshint and csslint tasks
* minify - Generate stylesheets from SCSS, concat js files and minify all
* build - Prepare a complete build (without linting presently)

## Contributors
* Nick Pack

## Licence
Copyright (c) 2013 Nick Pack
Licensed under the MIT license.	