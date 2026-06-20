import cors from "cors";
import express from "express";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT ?? 3001);
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFile = join(__dirname, "..", "data", "inquiries.json");

type Inquiry = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

app.use(cors({ origin: ["http://localhost:4200", "http://127.0.0.1:4200"] }));
app.use(express.json({ limit: "20kb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "portfolio-contact-api" });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as Partial<Inquiry>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ ok: false, error: "Name, email, and message are required." });
    return;
  }

  const inquiry: Inquiry = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  await mkdir(dirname(dataFile), { recursive: true });

  let inquiries: Inquiry[] = [];
  try {
    inquiries = JSON.parse(await readFile(dataFile, "utf8")) as Inquiry[];
  } catch {
    inquiries = [];
  }

  inquiries.unshift(inquiry);
  await writeFile(dataFile, JSON.stringify(inquiries, null, 2));

  res.status(201).json({ ok: true, message: "Inquiry captured locally." });
});

app.listen(port, () => {
  console.log(`Portfolio contact API running at http://localhost:${port}`);
});
