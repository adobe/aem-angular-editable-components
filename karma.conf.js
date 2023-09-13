/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const plugins = [
  require('karma-jasmine'),
  require('karma-chrome-launcher'),
  require('karma-jasmine-html-reporter'),
  require('karma-coverage-istanbul-reporter'),
  require('@angular-devkit/build-angular/plugins/karma')
];


const customLaunchers = {
  ChromeCI: {
    base: 'ChromeHeadless',
    flags: [ '--no-sandbox', '--headless' ]
  }
};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [ 'jasmine', '@angular-devkit/build-angular' ],
    plugins,
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: [ 'text', 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    reporters: [ 'progress', 'kjhtml', 'coverage-istanbul' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [ 'ChromeCI' ],
    singleRun: true,
    customLaunchers
  });
};
