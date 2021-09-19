const express = require("express");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use(routes.productsRouter);
app.use(routes.usersRouter);

app.listen(PORT, () => console.log(`Server is running on the ${PORT}`));
