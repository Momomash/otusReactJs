const path = require('path');
const webpack = require('webpack');
const custom = require('../webpack.config');

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
};


