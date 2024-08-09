const express = require("express");
const app = express();
const Pool = require("pg").Pool;
const path = require("path");
const PORT = 5000;
const ejs = require("ejs");
const cors = require("cors");
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  port: process.env.PORT_NUMBER,
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/static", express.static("static"));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error in connection", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to Database.");
  });
});

app.get("/", async (req, res) => {
  const data = await pool.query("select * from student");
  res.render("index", { data: data.rows });
});

app.post("/newStudent", async (req, res) => {
  const { name, email, gender, field1, field2 } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO student (student_name, email, gender, field1, field2) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, gender, field1, field2]
    );
    res.redirect("/");
  } catch (error) {
    console.error("Error inserting student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/students", async (req, res) => {
  const data = await pool.query("select * from student");
  res.render("students", { data: data.rows });
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const data = await pool.query("SELECT * FROM student WHERE id = $1", [id]);
  res.render("edit", { data: data.rows });
});

app.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, gender, field1, field2 } = req.body;

  try {
    await pool.query(
      `UPDATE student SET student_name = $1, email = $2, gender = $3, field1 = $4, field2 = $5 WHERE id = $6`,
      [name, email, gender, field1, field2, id]
    );
    res.redirect("/");
  } catch (error) {
    console.error("Error inserting student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await pool.query("DELETE FROM student WHERE id = $1", [id]);
  res.redirect("/");
});

app.get("/bikes", async (req, res) => {
  const data = await pool.query(`SELECT * FROM royal_enfield`);
  res.render("bikes", { data: data.rows });
});

app.get("/allBikes", async (req, res) => {
  const data = await pool.query(`select * from  royal_enfield`);
  res.json({ data: data.rows });
});

app.get("/saleMonthly/:month", async (req, res) => {
  const month = req.params.month;
  const data = await pool.query(
    `select model, units_sold from royal_enfield where month = $1`,
    [month]
  );
  res.json({ data: data.rows });
});

app.get("/saleModel/:model", async (req, res) => {
  const model = req.params.model;
  const data = await pool.query(
    `select month, units_sold from royal_enfield where model = $1`,
    [model]
  );
  console.log(data);
  res.json({ data: data.rows });
});
//search
app.post("/search", async (req, res) => {
  const searchTerm = req.body.search;
  const data = await pool.query(
    `SELECT * FROM todo WHERE todo ILIKE '${searchTerm}%'`
  );
  res.render("search", { data: data.rows });
});

//BOOKS ENDPOINT
// Get all books
app.get("/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.render("books", { data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/add-book", async (req, res) => {
  const { title, author, metadata } = req.body;

  try {
    const parsedMetadata = JSON.parse(metadata);
    await pool.query(
      "INSERT INTO books (title, author, metadata) VALUES ($1, $2, $3)",
      [title, author, parsedMetadata]
    );
    res.redirect("/books");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding book");
  }
});

// Update book metadata
app.post("/update-book/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, metadata } = req.body;

  try {
    await pool.query(
      "UPDATE books SET title = $1, author = $2, metadata = $3 WHERE id = $4",
      [title, author, metadata, id]
    );
    res.send({ status: "OK" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating book");
  }
});

// Delete a book
app.get("/deleteBook/:id", async (req, res) => {
    const id = req.params.id;
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/books");
  });


// NOTES ENDPOINTS
app.post("/createNote", async (req, res) => {
  const { note, writtenBy } = await req.body;

  try {
    const newNote = await pool.query(
      "INSERT INTO notes (note, written_by) VALUES ($1, $2) RETURNING *",
      [note, writtenBy]
    );
    res.status(200).json({ message: "OK" });
    console.log(newNote.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getNotes", async (req, res) => {
  const data = await pool.query("SELECT * FROM notes");
  res.json(data.rows);
});

app.delete("/deleteNote/:id", async (req, res) => {
  const id = req.params.id;
  await pool.query("DELETE FROM notes WHERE id= $1", [id]);
  res.status(200).json({ message: "Note Deleted" });
});

app.put("/updateNote/:id", async (req, res) => {
  const id = await req.params.id;
  const { note, writtenBy } = req.body;

  try {
    const updatedNote = await pool.query(
      `UPDATE notes SET note = $1, written_by = $2 WHERE id = $3`,
      [note, writtenBy, id]
    );
    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
