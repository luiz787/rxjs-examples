import cors from "cors";
import express, { json } from "express";

const app = express();

app.use(json());
app.use(cors());
app.get("/reallyImportantEndpoint/:id", (req, res) => {
  const array = [1, 2, 3];
  array.includes(2);

  const func = (val) => val * 2;
  const arrayNovo = array.map(func);
  console.log(`Message: ${req.params["id"]}`);
  const parameter = req.params["id"];

  setTimeout(() => {
    return res.send({
      message: `Hello, ${parameter}!`,
    });
  }, 5000);
});

app.listen(1337, () => {
  console.log("Started successfully.");
});
