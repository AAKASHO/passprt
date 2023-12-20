install necassary packages

npm init -y 

npm install express canvas body-parser qrcode

replace scripts part of package.json file with:

"scripts": {
    "dev": "nodemon api/index.js"
  },

Run your Node.js application:

npm run dev

server will run on http://localhost:3001

ticket will be generated on route:

http://localhost:3001/api/generate-ticket

output
![image](https://github.com/AAKASHO/passprt/assets/76911961/e16121cc-1375-4e1a-bf1f-204cebacfd73)


to run the server and server will take required inputs and return the ticket with details of it
