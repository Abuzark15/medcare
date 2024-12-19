const express = require('express');
const sequelize = require('./db-config/dbconfig');
const http = require('http');
const setupSocket = require('./middleware/socket');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Adjust the port or URL of your React app
  })); 

const server = http.createServer(app);

const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const loginRoutes = require('./routes/loginRoutes');


const docRoute = require('./routes/docRoutes')
const requestRoute = require('./routes/docRoutes');
const adminroutes = require('./routes/adminRoutes');
const getDoctorsRoute = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes'); 

app.use('/uploads', express.static('uploads'));

app.use('/api/patients', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/availability', availabilityRoutes);   
app.use('/api/consultations', consultationRoutes);
app.use('/api/common' ,loginRoutes);


app.use('/api/user',docRoute);
app.use('/api/admin', requestRoute);
app.use('/api/admin',adminroutes);
app.use('/api/user', getDoctorsRoute);
app.use('/api/chat', chatRoutes);

setupSocket(server);
sequelize.sync({alter: true}).then(() => {
    app.listen(2449, () => {
        console.log(`Server is running on http://localhost:`);
    });
}).catch(err => console.error('Unable to connect to the database:', err));