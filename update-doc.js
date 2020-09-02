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

const fs = require('fs');
const path = require('path');

const basePath = './docs/classes';
// Read the docs generated files
fs.readdir(path.resolve(basePath), function (err, files) {
  files.forEach((file) => {
    let filePath = path.resolve(basePath, file);
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) return console.log(err);
      // Replace the file links references
      let fileRegex = `${file}#`;
      let re = new RegExp(fileRegex, "g");
      let result = data.replace(re, `#${file}_`);
      // Replace the file links urls
      let linkRegex = `<a id="(.*?)">`;
      re = new RegExp(linkRegex, "g");
      result = result.replace(re, `<a id="${file}_$1">`);
      // Increase all heading levels
      result = result.replace(/# /g, "## ");
      // Replace the first line of the file with a file link
      result = result.replace(/^(.*)$/m, `<a id="${file}"></a>`);
      // Replace all links to files with an inline link
      result = result.replace(/[\(]((\w*?).md)/g, `(#$1`);
      // Update the file to the disk
      fs.writeFile(filePath, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  });
});

const docsReadmePath = path.resolve('./docs/README.md');

fs.readFile(docsReadmePath, 'utf8', function(err, data) {
  if (err) return console.error(err);
  data = data.substr(data.indexOf("### Classes"), data.length);
  data = data.replace(/(\* \[.*])\((classes\/.*.md)\)/g, `#include "docs/$2"`)
  fs.writeFile("DOCUMENTATION.MD", data, 'utf8', function (err) {
     if (err) return console.error(err);
  });
});
