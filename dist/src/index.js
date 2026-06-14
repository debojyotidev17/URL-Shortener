import express from "express";
import userRoutes from "./routes/user.routes.js";
const app = express();
const PORT = 8000;
app.use(express.json());
app.use("/user", userRoutes);
app.listen(PORT, () => {
    console.log(`Successfully listening at port ${PORT}`);
});
//# sourceMappingURL=index.js.map