#!/bin/bash
set -e
set -x
export PATH=$PATH:./node_modules/.bin
istanbul cover mocha -- -R list -u tdd test/
