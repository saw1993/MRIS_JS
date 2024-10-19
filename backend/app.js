const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');
const miscRoutes = require('./routes/miscRoutes');

const requestLogger = require('./middlewares/requestLogger');
const initUserRoutes = require('./routes/initUserRoutes');
const logger = require('./config/logger');
const cors=require('cors');
const app = express();
const PORT = process.env.PORT || 3000;



// Configure CORS
const corsOptions = {
    origin: 'https://localhost:3000' // Update with your frontend URL
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());
app.use(requestLogger);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/init', initUserRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/misc', miscRoutes);


// HTTPS setup
const privateKey = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(parseInt(PORT), () => {
    logger.info(`HTTPS Server running on port ${PORT}`);
});