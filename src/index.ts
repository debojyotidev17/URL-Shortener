import express from "express";
import userRoute from "./routes/user.routes.js";
import shortenURLRoute from "./routes/shortenURL.routes.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import getUrls from "./routes/urls.routes.js";
import { shortCode } from "./controllers/getshortcode.js";
import refreshToken from "./routes/refreshToken.routes.js"

const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/user", userRoute);
app.use("/shorten", authMiddleware, shortenURLRoute);
app.use("/urls", authMiddleware, getUrls);
app.use("/refresh", refreshToken);
app.get("/:shortcode", shortCode);

app.listen(PORT, () => {
    console.log(`Successfully listening at port ${PORT}`);
});
