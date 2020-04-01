#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

let [,, ...args] = process.argv;

const slug = args[0];

const [category, ...subDirPath] = slug.split('/');

const createDirs = (startingDir, subDirs) => {
  console.log(startingDir);
  console.log(subDirs);
  const filePath = path.join(...subDirs);
  fs.mkdirSync(path.join(startingDir, filePath), { recursive: true });
  return path.resolve(startingDir, filePath);
}

console.log(
  createDirs(
    path.resolve(__dirname, `../src/content/${category}/posts`),
    subDirPath
  )
);

// ./ceate-post work/test
