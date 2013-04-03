#!/bin/bash
cd /vagrant
rm -rfv /vagrant/src/js/libs/*
bower install
grunt build
