const express = require("express");
const todoRouter = require("./routes/todo");
const cors = require("cors");

const app = express();

const port = 3010;

// 미들웨어들
app.use(cors());
app.use(express.json()); // json 객체로 받아올 수 있음
app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port} 🚗`);
});
