const express = require("express");
const cors = require("cors");

const app = express();

/* ------------------ CORS CONFIG ------------------ */
app.use(cors({
  origin: "http://13.232.206.248:8082",   // Angular frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors()); // Allow preflight for all routes

/* ------------------ PARSE REQUESTS ------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ------------------ DATABASE CONNECTION ------------------ */
const db = require("./app/models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.error("Cannot connect to the database!", err);
    process.exit();
  });

/* ------------------ ROUTES ------------------ */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

require("./app/routes/turorial.routes")(app);

/* ------------------ SERVER LISTEN ------------------ */
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}.`);
});


