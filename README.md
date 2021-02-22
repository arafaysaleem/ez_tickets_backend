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
* [dotenv]
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

# Copy example.env and create your own .env file
cp example.env .env

# Edit .env file and add your mysql username, password and db name, host, port and jwt_secret
vscode .env
# you can edit the file also via text editor

# Add a gitignore to ignore node_modules and your .env file
echo -e 'node_modules \n .env \n' >> .gitignore
```

### Setup MySQL database

Import the ez_ticket.sql using your sql workbench to create the database.

### (Optional) Setup Postman API

If you want to quickly setup the endpoints for testing:

* Go to Postman to import backup
* Upload the postman_collections_backup.zip

### Setting up node js

``` sh
# Install dependencies
npm install

# Run the server locally
npm start

# Run the server locally in dev mode with nodemon
npm run dev

# While deploying to production
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
   [dotenv]: <https://github.com/motdotla/dotenv#readme>
   [cors]: <https://github.com/expressjs/cors#readme>
   [babel-eslint]: <https://github.com/babel/babel-eslint>
