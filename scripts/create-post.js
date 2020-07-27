#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const moment = require('moment');

let [,, ...args] = process.argv;

const slug = args[0];

if (slug === '--help' || slug === '-h') {
  return console.log(
    `
      Create new posts by passing a path:
      
      ./create-posts.js work/posts/new-post
    `
  );
}

const [category, type, ...postPath] = slug.split('/');

const subDirPath = postPath.slice(0, -1);

const postName = postPath[postPath.length - 1];

const postTemplate = `---
date: "${moment().format("YYYY-MM-DD")}"
title: "${postName.charAt(0).toUpperCase() + postName.slice(1)}"
featuredImage: ""
featuredAttribution:
  name: ""
  url: ""
previewImage: ""
featuredAlt: ""
excerpt: ""
author:
  name: "Alex Hadik"
  email: "alex@alexhadik.com"
categories: []
keywords: []
---`;

const createDirs = (startingDir, subDirs, postName) => {
  if (fs.existsSync(startingDir)) {
    const filePath = path.join(...subDirs, postName);
    // Make the provided file path.
    fs.mkdirSync(path.join(startingDir, filePath), { recursive: true });

    const postPath = path.resolve(startingDir, filePath);
    const postIndexPath = path.join(postPath, 'index.mdx');

    if (fs.existsSync(postIndexPath)) {
      return console.error(`Index file already exists at ${path.join(filePath, 'index.mdx')}.`);
    }
    
    fs.writeFileSync(path.join(postPath, 'index.mdx'), postTemplate);

    return console.log(`Successfully created blank post for ${postName} at ${filePath}`);
  }

  console.error(`Starting directory ${startingDir} does not exist. Check that your slug is correct.`);
}

createDirs(
  path.resolve(__dirname, `../src/content/${category}/${type}`),
  subDirPath,
  postName
);
