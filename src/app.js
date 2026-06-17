import express from "express";
import userRoutes from './routes/user.route.js';
import serviceRoutes from './routes/services.route.js';
import requestRoutes from './routes/request.route.js';
const app = express();
app.use(express.json());

//api declaration


app.use('/api/users', userRoutes);

//http request http://localhost:5000/api/users/register
//http request http://localhost:5000/api/users/login
//http request http://localhost:5000/api/users/logout

app.use('/api/services', serviceRoutes);

//http request http://localhost:5000/api/services/createservice
//http request http://localhost:5000/api/services/getallservices
//http request http://localhost:5000/api/services/getmyservices
//http request http://localhost:5000/api/services/getservice/:id
//http request http://localhost:5000/api/services/updateservice/:id
//http request http://localhost:5000/api/services/deleteservice/:id

app.use('/api/requests', requestRoutes);

//http request http://localhost:5000/api/requests/createrequest
//http request http://localhost:5000/api/requests/getmyrequests
//http request http://localhost:5000/api/requests/getproviderrequests
//http request http://localhost:5000/api/requests/updaterequeststatus/:id



export default app;