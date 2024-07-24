const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const cors=require('cors');
const app = express();
const port = 3000;

// Configure CORS
const corsOptions = {
    origin: 'https://localhost:3001' // Update with your frontend URL
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);



// HTTPS setup
const privateKey = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});