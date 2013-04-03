# Static Site Build Boilerplate
This is an attempt at automating our static site builds at [Cohaesus](http://www.cohaesus.co.uk).

## Requirements
* [Vagrant](http://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/) or [VMWare Fusion 5] (http://www.vmware.com/products/fusion/overview.html)

## Whats Included in the boilerplate?

* [Nick Pack's SCSS fork of Skeleton](https://github.com/nickpack/Skeleton-SCSS)
* Bower managed js dependencies
* SCSS compilation
* Minification and concatenation of JS and CSS
* Templated html via grunt-swig, with compilation to static files
* A number of grunt tasks to speed up development
* Vagrant & Puppet nginx dev box configuration
* All grunt tasks and dependencies installed in the vagrant host

## Getting started
1. Install VirtualBox or Vmware Fusion 5 (See links above in requirements)
2. Install Vagrant (See links above in requirements)
3. Clone project
4. In root of project type the following command to start the vagrant VM and configure using puppet

For default VirtualBox provider

    vagrant up

For VMWare Fusion 5 Provider

    vagrant up --provider vmware_fusion

The Vagrant file is configured to select the right box image depending on the provider.

## Running a Build
SSH onto the VM and navigate to the /vagrant directory. 
This directory is mapped to the root of the project folder

    vagrant ssh
    cd /vagrant
    
There is a start.sh bash script that will do some basic housekeeping, 
and run the first grunt build

    sh start.sh

The I/O performance of the VirtualBox VM is too poor to usefully run grunt watch, 
so you will need to manually build the project as you make changes. This can be done using:

    grunt build

Alternatively if you have the VMWare Fusion the improved I/O grunt watch works just fine. 
You can run this using:
    
    grunt watch
 
View the current build at [http://127.0.0.1:8001](http://127.0.0.1:8001) on your local machine 

## Configured Grunt Tasks
* concat - Concatenates third party libs into one file, and project specific js into another
* uglify - Minifies afore mentioned files via uglify
* jshint - Lint project js files
* sass - Compile SCSS files into one project CSS file
* csslint - lint CSS syntax
* cssmin - Minify project css file
* swig - Compile static HTML versions of semi-dynamic templates
* copy - Place all project related files in the build directory
* watch - Watch for changes and rebuild
* lint - Run jshint and csslint tasks
* minify - Generate stylesheets from SCSS, concat js files and minify all
* build - Prepare a complete development build
* release - Prepare a complete production build with minification etc

## Contributors
* Nick Pack
* Matt Meckes

## Licence
Copyright (c) 2013 Cohaesus
Licensed under the MIT license.	