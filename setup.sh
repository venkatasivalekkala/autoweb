#!/usr/bin/env bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install node
brew install watchman
npm install
npm install -g flow-typed
if [ -d ./flow-typed ]; then
  rm -rf ./flow-typed
fi
flow-typed install
if [ -f node_modules/intl/.babelrc ]; then
  mv node_modules/intl/.babelrc  node_modules/intl/.babelrc.original
fi
