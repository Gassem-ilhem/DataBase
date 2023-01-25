const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");

//connect data
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "art_db",
});

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "100mb",
    extended: true,
  })
);
app.use(cors());
//app.options("*", cors());
app.use(express.json());

//get artiste (affiche)
app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM Artistes";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

//post artiste (ajout)
app.post("/api/post", (req, res) => {
  const {
    NPArtiste,
    DateNais,
    LieuNais,
    DateDeces,
    LieuDeces,
    Nation,
    Biograph,
    OEUVREId,
  } = req.body;
  const sqlInsert =
    "INSERT INTO Artistes(NPArtiste,DateNais,LieuNais,DateDeces,LieuDeces,Nation,Biograph,OEUVREId) VALUES (?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      NPArtiste,
      DateNais,
      LieuNais,
      DateDeces,
      LieuDeces,
      Nation,
      Biograph,
      OEUVREId,
    ],
    (error, result) => {
      res.send(result);
      if (error) {
        console.log(error);
      }
    }
  );
});

//post artiste (supprimer)
app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM Artistes WHERE id=?";
  db.query(sqlRemove, id, (error, result) => {
    res.send(result);
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/search/:id", async (req, res) => {
  const { id } = req.params;
  const sqlSearch = "SELECT * FROM Artistes WHERE id=?";
  db.query(sqlSearch, (error, result) => {
    res.send(result);
  });
});

app.get("/", (req, res) => {
  /*const sqlInsert =
    "INSERT INTO `artistes` (`id`, `NPArtiste`, `DateNais`, `LieuNais`, `DateDeces`, `LieuDeces`, `Nation`, `Biograph`, `createdAt`, `updatedAt`, `OEUVREId`) VALUES (NULL, '1234', '2023-01-24 21:40:41.000000', '1234', '2023-01-24 21:40:41.000000', '123', '123', '123', '2023-01-24 21:40:41.000000', '2023-01-24 21:40:41.000000', '1'), (NULL, '123', '2023-01-24 21:40:41.000000', '123', '2023-01-24 21:40:41.000000', '132', '123', '123', '2023-01-24 21:40:41.000000', '2023-01-24 21:40:41.000000', '2'); ";
  db.query(sqlInsert, (error, result) => {
    console.log("error", error);
    res.send("hello express");
  });*/
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server up running"));
