# Static Site Build Boilerplate
This is an attempt at automating our static site builds at [Cohaesus](http://www.cohaesus.co.uk).

## Requirements
* [Node](http://nodejs.org/)
* [npm](https://npmjs.org/)
* [bower](http://twitter.github.com/bower/)
* [grunt](http://gruntjs.com/)
* [Vagrant](http://www.vagrantup.com/)

## Whats Included in the boilerplate?

* [Nick Pack's SCSS fork of Skeleton](https://github.com/nickpack/Skeleton-SCSS)
* Bower managed js dependencies
* SCSS compilation
* Minification and concatenation of JS and CSS
* Templated html via grunt-templater, meaning you can use your favourite node template engine to generate static files
* A number of grunt tasks to speed up development
* Vagrant & Puppet nginx dev box configuration

## Getting started
1. Install node and npm (See links above in requirements)
2. Use npm to install grunt-cli and bower globally (You may need sudo for this) 
> npm install -g grunt-cli bower
3. Run npm install from the root, to install all of the build dependencies
> npm install
4. Run bower install from the root to add common js libraries to the project (currently jQuery and modernizr)
> bower install
5. Run grunt build to build the initial set of files (You should see these in the build directory once it completes it)
> grunt build
6. Run grunt watch to trigger builds on file changes
> grunt watch
7. Run vagrant up to get your local dev box going 
> vagrant up
8. Hack till your heart is content, and build some awesome shit.


View the current build at [http://127.0.0.1:8001](http://127.0.0.1:8001) on your local machine 

**If you are not using VMWare, you'll need to change the box filename in the Vagrantfile to precise64.box**
> config.vm.box_url = "http://files.vagrantup.com/precise64.box"

*Similarly, if you are running a 32-bit box, substitute 64 in the file name for 32.*

## Configured Grunt Tasks
* concat - Concatenates third party libs into one file, and project specific js into another
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