# EZ Tickets Rest API built with NodeJs, Express and MySql

### Tech

This example uses a number of open source projects to work properly:

* [node.js]
* [Express]
* [mysql2]
* [bcryptjs]
* [jsonwebtoken]
* [otp-generator]
* [express-validator]
* [dotenv-flow]
* [cross-env]
* [cors]
* [babel-eslint]

### Getting Started

``` sh
# Clone this repo to your local machine using
git clone https://github.com/arafaysaleem/ez_tickets_backend

# Get into the directory
cd ez_tickets_backend

# Make it your own
rm -rf .git && git init

# Copy example.env and create your own .env file in configs folder
cp .env.example configs/.env

# Move into the configs dir
cd configs

# Edit .env file and add your mysql username, password and db name, host,
# port, jwt_secret, sendgrid api key and sender email
vscode .env

# Create different .env.{NODE_ENV} file for each environment and override only your
# required variables. The missing ones will be loaded from .env by default.
# When the NODE_ENV variable is set while running the correct .env loads automatically.
# For example if you want dev and prod environments:
cp .env .env.dev
cp .env.dev .env.prod

# Add a gitignore to ignore node_modules and your .env file
echo -e 'node_modules \n configs \n' >> .gitignore
```

### Setup MySQL database

Import the ez_ticket.sql using your sql workbench to create the database.

### (Optional) Setup Postman API

If you want to quickly setup the endpoints for testing:

* Go to Postman to import backup
* Upload the schema_backup or unzip postman_collections_backup.zip upload the folder

### Setting up node js

``` sh
# Install dependencies
npm install

# Run the server locally with default .env file
npm start

# Run the server in dev mode with nodemon with .env.dev file
npm run dev

# While deploying to production with .env.prod file
npm run prod
```

**Enjoy :)**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [git-repo-url]: <https://github.com/arafaysaleem/ez_tickets_backend>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [mysql2]: <https://github.com/sidorares/node-mysql2#readme>
   [otp-generator]: <https://github.com/Maheshkumar-Kakade/otp-generator#readme>
   [bcryptjs]: <https://github.com/dcodeIO/bcrypt.js#readme>
   [jsonwebtoken]: <https://github.com/auth0/node-jsonwebtoken#readme>
   [express-validator]: <https://express-validator.github.io/docs/>
   [dotenv-flow]: <https://github.com/kerimdzhanov/dotenv-flow>
   [cross-env]: <https://github.com/kentcdodds/cross-env>
   [cors]: <https://github.com/expressjs/cors#readme>
   [babel-eslint]: <https://github.com/babel/babel-eslint>
