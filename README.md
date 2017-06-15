# Catch Light
[![Build Status](https://travis-ci.org/mysticPrg/catch-light.svg?branch=master)](https://travis-ci.org/mysticPrg/catch-light)
[![Coverage Status](https://coveralls.io/repos/github/mysticPrg/catch-light/badge.svg?branch=master)](https://coveralls.io/github/mysticPrg/catch-light?branch=master)
[![Code Climate](https://codeclimate.com/github/mysticPrg/catch-light/badges/gpa.svg)](https://codeclimate.com/github/mysticPrg/catch-light)
[![Inline docs](http://inch-ci.org/github/mysticPrg/catch-light.svg?branch=master)](http://inch-ci.org/github/mysticPrg/catch-light)

# using npm
## start development server
npm start

# using docker
## start server (temporary server)
sudo docker run --name catch-light -d -p 3000:3000 mysticprg/catch-light 

connect http://localhost:3000

## start develop mode
sudo docker run --name catch-light -d -p 3000:3000 -v `pwd`/src:/app/src mysticprg/catch-light

connect http://localhost:3000 and edit source files...

## stop
sudo docker stop catch-light


