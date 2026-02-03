import express from 'express';
import router from './routes/url.routes';


const app = express();

app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error) => {
    console.log("Server Error:", error);
});