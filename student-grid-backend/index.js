const express = require('express');
const app = express();
const stundentRouting = require('./router/studentGrid');
const cors = require('cors'); 

app.use(cors());
app.use('/api', stundentRouting);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
