<h1 align="center">
  Alex Hadik's Personal Website
</h1>

This repository holds the code, written content and media for [my personal website](https://www.alexhadik.com). It uses Gatsby to build Markdown and React content into a static HTML site that can easily be deployed to S3. 

## 🚀 Clone and Explore

It's pretty simple. Clone, install and run. I suppose there's a few extra steps in there.

1.  **Clone and install.**

    I like Yarn, but NPM works too of course.

    ```shell
    git clone git@github.com:ahadik/portfolio.git
    yarn install
    ```

1.  **Set up Firebase.**

    This site uses Firebase to authenticate restricted content. If you intend to use this feature, you'll need to set up a [Firebase](https://console.firebase.google.com/u/0/) project, add Authentication, and create a user. You'll use the email address of that user in the next step.

1.  **Set up environment variables.**

    `.env` files are used to set variables for different build environments. Copy the `.sample.env` file and rename it to `.env` if you intend to use the same values for every environment, or to `.env.ENV` (`.env.staging` for example) if you want different values for different environments. I have four `.env` files:

    - `.env.development`: For values needed while viewing the site on the development server.
    - `.env.local`: For values while viewing the production built site on a local server.
    - `.env.staging`: For values needed for a staging environment.
    - `.env.production`: For values needed for a staging environment.

    ```shell
    cp .sample.env .env
    ```

    There are six key pieces of information you'll need to expose in your .env file(s).

    - `SITE_URL=<URL>`: The URL for accessing the site for this environment
    - `FIREBASE_API_KEY=<API_KEY>`: Get it from the Firebase console.
    - `FIREBASE_AUTH_DOMAIN=<AUTH_DOMAIN>`: Get it from the Firebase console.
    - `FIREBASE_DATABASE_URL=<DATABASE_URL>`: Get it from the Firebase console.
    - `FIREBASE_PROJECT_ID=<PROJECT_ID>`: Get it from the Firebase console.
    - `FIREBASE_USER_EMAIL=<USER_EMAIL>`: This is the email address of a user you've set up in Firebase, the password of which will be used to authenticate restricted content.

1.  **Run the Gatsby dev server.**
    ```shell
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._


## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in this project.

    .
    ├── node_modules
    ├── src
    |   ├── pages
    |   ├── content
    |   ├── components
    |   ├── data
    |   ├── images
    |   ├── services
    |   ├── templates
    |   └── fragments.js
    ├── scripts
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── .sample.env
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that this project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`/scripts`**: This directory will contain scripts that help automate your work, such as creating a blank post (`create-post.js`) or deploying (`deploy.js`).

4.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

5.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

6.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

7.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

8.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

9.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

10.  **`LICENSE`**: Gatsby is licensed under the MIT license.

11. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for this project. **(You won’t change this file directly).**

12. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for this project.

13. **`.sample.env`**: A sample config file. Copy and rename it to start with `.env` and it will automatically be ignored from Git tracking. Now you can store sensitive API keys and the like in it.

14. **`README.md`**: A text file containing useful reference information about this project.

## 🎓 Learning Gatsby (What this site is built on)

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

I deploy this site to S3, so I use the `scripts/deploy.js` script (accessible as a Yarn script with `yarn deploy` and `yarn deploy:<ENV>` — look in `package.json` for more info) to upload my site after it's been built.

1. **Copy config files:** `aws-config.ENV.js.example` is checked into source control and will have been cloned locally. Copy it for each environment: `cp aws-config.ENV.js.example aws-config.staging.js` for a staging environment for example. This new file is ignored in `.gitignore` by default if you follow these naming conventions.
2. **Configure each `aws-config` file:** You'll need to create the appropriate S3 buckets, an AWS access ID and secret, and fill in the corresponding info in your newly created `aws-config` files.
1. **Build the site for production**: `yarn build:<ENV>` where `ENV` is either (`local`, `staging`, or `production`). This will ensure the right URLs are used in the final build.
2. **Deploy your built site:** `node scripts/deploy.js --<ENV>`

## ✨Enjoy!!
Your Gatsby built files should upload to S3 and you can take it from there!
