import cors from "cors";
import express, { json } from "express";

const app = express();

app.use(json());
app.use(cors());
app.get("/reallyImportantEndpoint/:id", (req, res) => {
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
