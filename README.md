# EZ Tickets Rest API built with NodeJs, Express and MySql
[![Node Build, Test And Lint CI](https://github.com/arafaysaleem/ez_tickets_backend/actions/workflows/build-test.yml/badge.svg)](https://github.com/arafaysaleem/ez_tickets_backend/actions/workflows/build-test.yml) [![Deploy To Heroku](https://github.com/arafaysaleem/ez_tickets_backend/actions/workflows/deploy.yml/badge.svg)](https://github.com/arafaysaleem/ez_tickets_backend/actions/workflows/deploy.yml) ![API Version](https://img.shields.io/badge/api--version-v1-orange) [![GitHub issues](https://img.shields.io/github/issues/arafaysaleem/ez_tickets_backend)](https://github.com/arafaysaleem/ez_tickets_backend/issues) [![GitHub forks](https://img.shields.io/github/forks/arafaysaleem/ez_tickets_backend)](https://github.com/arafaysaleem/ez_tickets_backend/network) [![GitHub stars](https://img.shields.io/github/stars/arafaysaleem/ez_tickets_backend)](https://github.com/arafaysaleem/ez_tickets_backend/stargazers) [![GitHub license](https://img.shields.io/github/license/arafaysaleem/ez_tickets_backend)](https://github.com/arafaysaleem/ez_tickets_backend) [![Docs badge](https://img.shields.io/badge/docs-active-yellow.svg)](https://shields.io/) <br>
[![BadgeNodeJS](https://img.shields.io/badge/MADE%20WITH-NODEJS-brightgreen?style=for-the-badge&logo=Node.js)](https://shields.io/) [![BadgeExpress](https://img.shields.io/badge/USES-EXPRESS-red?style=for-the-badge)](https://shields.io/) [![BadgeMySQL](https://img.shields.io/badge/USES-MYSQL-4479A1?style=for-the-badge&logo=MySQL)](https://shields.io/) [![BadgeAWS](https://img.shields.io/badge/DATABASE-AWS%20RDS-FF9900?style=for-the-badge&logo=Amazon&20AWS)](https://shields.io/) [![BadgeHeroku](https://img.shields.io/badge/DEPLOYED-HEROKU-430098?style=for-the-badge&logo=Heroku)](https://shields.io/)


### :memo: Documentation

The documentation was generated using Postman and is divided into collections at the following URLs:

- Auth - https://documenter.getpostman.com/view/13348269/TzRa6443
- Movies - https://documenter.getpostman.com/view/13348269/TzRa63yg
- Roles - https://documenter.getpostman.com/view/13348269/TzRa63yh
- Genres - https://documenter.getpostman.com/view/13348269/TzRa63yf
- Shows - https://documenter.getpostman.com/view/13348269/TzRa643z
- Theaters - https://documenter.getpostman.com/view/13348269/TzRa6441
- Bookings - https://documenter.getpostman.com/view/13348269/TzRa63ye
- Payments - https://documenter.getpostman.com/view/13348269/TzRa63yi

### :rocket: Deployement

- The database for this API is hosted using AWS RDS (Make sure to update the .env.prod file with your own Database Hosting Url, otherwise the production environment will be running on the local database as well)
- The Production API is deployed using Heroku

**IMPORTANT:** The URLs for both of these deployments is kept private due to security reasons. You can use any services out there for your own hosting requirements. 

The release branch contains workflow to deploy to my own Heroku Service and won't work on your fork. If you want to use heroku as well, see their instructions and update your github secrets with your own credentials to make the release branch CI work for you as well.

### :dvd: Installation
#### 1. Getting Started

``` sh
# Clone this repo to your local machine using
git clone https://github.com/arafaysaleem/ez_tickets_backend

# Get into the directory
cd ez_tickets_backend

# Make it your own
rm -rf .git && git init
```

### 2. Setting Up ENV Variables
```sh
# Copy example.env and create your own .env file in envs folder
cp .env.example envs/.env

# Move into the envs dir
cd envs

# Edit .env file and add your mysql username, password and db name, host,
# port, jwt_secret, sendgrid api key and sender email
vscode .env

# Create different .env.{NODE_ENV} file for each environment and override only your
# required variables. The missing ones will be loaded from .env by default.
# For example if you want dev and production environments:
cp .env .env.dev
cp .env.dev .env.production

# When the NODE_ENV variable is set while running, the correct .env loads automatically.
# e.g. Setting NODE_ENV=production is going to load the .env.production file

# Add a gitignore to ignore node_modules and your .env file
echo -e 'node_modules \n envs \n' >> .gitignore
```

#### 3. Setup MySQL database

Import the ez_ticket.sql using your sql workbench to create the database.

#### 4. Setting up node js

``` sh
# Install dependencies
npm install

# Run the server locally with default .env file
npm start

# Run the server in dev mode with nodemon with .env.dev file
npm run dev

# While deploying to production with .env.production file
npm run production
```

### :arrows_counterclockwise: Setup CI (Github Actions)

If you want to run the github testing and PR labelling workflows in the CI then:

Create the following repository secrets:
  * CONFIG_VARS: value should be the following .env file variables
   ```
   DB_HOST= db_localhost
   DB_USER= db_username
   DB_PASS= db_password
   DB_DATABASE= db_name
   ```
  * SENDGRID_API_KEY: value should be your .env file variable => sendgrid_api_key
  * SENDGRID_SENDER: value should be all your .env file variable => from_email
  * SECRET_JWT: value should be all your .env file variables => your_secret

### :man_astronaut: (Optional) Setup Postman API

If you want to quickly setup the endpoints for testing:

* Go to Postman to import backup
* Upload the schema_backup or unzip postman_collections_backup.zip and upload the folder

### :closed_book: Important Notes

- There are two types of users possible (admin, api_user)
- Most of the POST/PATCH/DELETE endpoints are forbidden to the `api_user` and only `admin` can use them. So make sure you use the `token` from an **admin account login** for `admin` access.
- Only some POST/PATCH endpoints are open to the `api_user` like updating his profile or creating a booking/payment.
- The `healthcheck` endpoint is to ensure the status of the API from the CI so we can be sure we are deploying a working API only.
- You need to make an account on Twillio and integrate Sendgrid to get your own `SENDGRID_API_KEY` and `SENDER_EMAIL`
- If you add/remove/change the names of any folders/file extensions make sure to update the [labeler.yml](.github/labeler.yml)

**Enjoy :)**

### :wrench: Tech

This example uses a number of open source projects to work properly:

* [node.js]
* [Express]
* [@sendgrid/mail]
* [bcryptjs]
* [cors]
* [cross-env]
* [deep-email-validator]
* [dotenv-flow]
* [express-validator]
* [jsonwebtoken]
* [mysql2]
* [otp-generator]
* [babel-eslint]
* [mocha]
* [eslint-config-strongloop]

### :bookmark_tabs: License
EZ Tickets Backend © 2021 by Abdur Rafay Saleem is licensed under CC BY 4.0 

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [git-repo-url]: <https://github.com/arafaysaleem/ez_tickets_backend>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [@sendgrid/mail]: <https://github.com/sendgrid/sendgrid-nodejs>
   [bcryptjs]: <https://github.com/dcodeIO/bcrypt.js#readme>
   [cors]: <https://github.com/expressjs/cors#readme>
   [cross-env]: <https://github.com/kentcdodds/cross-env>
   [deep-email-validator]: <https://github.com/mfbx9da4/deep-email-validator>
   [dotenv-flow]: <https://github.com/kerimdzhanov/dotenv-flow>
   [express-validator]: <https://express-validator.github.io/docs/>
   [jsonwebtoken]: <https://github.com/auth0/node-jsonwebtoken#readme>
   [mysql2]: <https://github.com/sidorares/node-mysql2#readme>
   [otp-generator]: <https://github.com/Maheshkumar-Kakade/otp-generator#readme>
   [babel-eslint]: <https://github.com/babel/babel-eslint>
   [mocha]: <https://github.com/mochajs/mocha>
   [eslint-config-strongloop]: <https://github.com/strongloop/eslint-config-strongloop>
