const express = require('express');
const bodyParser = require('body-parser');
const ticketGeneratorRouter = require('./routes/ticketGenerator');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Mount the ticket generator router
app.use('/api/generate-ticket', ticketGeneratorRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
