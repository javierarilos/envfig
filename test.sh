#!/bin/bash
set -e
set -x
export PATH=$PATH:./node_modules/.bin
istanbul cover ./node_modules/.bin/_mocha -- -u tdd test/

CODECLIMATE_REPO_TOKEN=5ed3f7099f54387ec83146bf3effe83e2b0a27b0d5f9acee4f9dea7f0ff27e58 codeclimate < coverage/lcov.info
