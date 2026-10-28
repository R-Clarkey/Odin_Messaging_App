import dotenv from "dotenv";
import app from "./app";
dotenv.config()

const NODE_ENV = process.env.NODE_ENV || "development"
if (NODE_ENV !== "production") {
  console.log(`Running in ${NODE_ENV} mode`)
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
