const express = require('express');
const path = require('path');
const app = express();
const port = parseInt(process.env.PORT) || 3030;


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/triangular', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'triangular.html'));
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});