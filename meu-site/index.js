import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.engine("hbs", engine({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "views", "layouts"),
  partialsDir: path.join(__dirname, "views", "partials"),
   helpers: {
    eq: (a, b) => a === b
  },
  defaultLayout: "main",
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views", "pages"));


app.use(express.static(path.join(__dirname, "public")));


app.get("/",        (req, res) => res.render("index",    { title: "Início" }));
app.get("/carta",   (req, res) => res.render("carta",    { title: "Cartinha" }));
app.get("/contagem",(req, res) => res.render("contagem", { title: "Contagem" }));
app.get("/fotos",   (req, res) => res.render("fotos",    { title: "Fotos" }));
app.get("/linha",   (req, res) => res.render("linha",    { title: "Linha do tempo" }));
app.get("/musicas", (req, res) => res.render("musicas",  { title: "Músicas" }));

const PORT = process.env.PORT || 10000;
// Importante ouvir em 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server on http://localhost:${PORT}`);
});
