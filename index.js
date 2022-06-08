require('dotenv').config();
const app = require('./src/app');

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
