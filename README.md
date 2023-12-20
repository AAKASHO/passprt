install necassary packages

npm init -y 

npm install express canvas body-parser qrcode

replace scripts part of package.json file with:

"scripts": {
    "dev": "nodemon api/index.js"
  },

Run your Node.js application:

npm run dev

to run the server and server will take required inputs and return the ticket with details of it
