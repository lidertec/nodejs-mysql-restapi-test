import express from "express";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";



const app = express();

app.use(express.json());

app.use("/api/", employeesRoutes); // Agrega la ruta api antes de employees
app.use("/api/", indexRoutes); // puede o no llevar la / al final

app.use((req, res, next) => {
  res.status(404).json({ message: "End Point Not Found!" });
});

export default app