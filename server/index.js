const server = require("./src/server");
const { conn } = require('./src/db.js');
const { fetchCountries } = require('./src/utils/fetchCountries');
const PORT = 3001;

conn.sync({ force: false }).then(async () => {
  await fetchCountries();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
}) 
}).catch(error => console.error(error))