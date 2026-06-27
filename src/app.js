import express from "express";
import userRoutes from './routes/user.route.js';
import serviceRoutes from './routes/services.route.js';
import requestRoutes from './routes/request.route.js';
import skillRoute from './routes/skillRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import reviewRoutes from './routes/review.route.js';
import cors from "cors";
const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

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

//add skill
app.use('/api/skills', skillRoute);

//http request http://localhost:5000/api/skills/createSkill
//http request http://localhost:5000/api/skills/approvedSkills
//http request http://localhost:5000/api/skills/approveSkill/:id
//http request http://localhost:5000/api/skills/deleteSkill/:id

app.use('/api/categories', categoryRoute);

//http request http://localhost:5000/api/categories/getAllCategories
//http request http://localhost:5000/api/categories/getCategoryById/:id
//http request http://localhost:5000/api/categories/createCategory
//http request http://localhost:5000/api/categories/updateCategory/:id
//http request http://localhost:5000/api/categories/deleteCategory/:id

app.use('/api/reviews', reviewRoutes);
//http request http://localhost:5000/api/reviews/createReview
//http request http://localhost:5000/api/reviews/getAServiceReviews/:Id
//http request http://localhost:5000/api/reviews/deleteAReview/:id


export default app;