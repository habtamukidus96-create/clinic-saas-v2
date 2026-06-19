import express from "express";
import cors from "cors";
import { db } from "./firebase.js";

const app = express();
app.use(cors());
app.use(express.json());

/* ======================
   CLINIC LOGIN / REGISTER
====================== */
app.post("/api/login", async (req, res) => {
  const { email } = req.body;

  const clinicRef = db.collection("clinics").doc(email);
  const doc = await clinicRef.get();

  if (!doc.exists) {
    await clinicRef.set({
      email,
      createdAt: Date.now()
    });
  }

  res.json({ clinicId: email });
});

/* ======================
   BOOK APPOINTMENT
====================== */
app.post("/api/book/:clinicId", async (req, res) => {
  const clinicId = req.params.clinicId;

  await db.collection("clinics")
    .doc(clinicId)
    .collection("appointments")
    .add({
      ...req.body,
      createdAt: Date.now()
    });

  res.json({ success: true });
});

/* ======================
   GET APPOINTMENTS
====================== */
app.get("/api/appointments/:clinicId", async (req, res) => {
  const snapshot = await db.collection("clinics")
    .doc(req.params.clinicId)
    .collection("appointments")
    .get();

  const data = snapshot.docs.map(doc => doc.data());

  res.json(data);
});

/* ======================
   AI CHATBOT (SMART LOGIC)
====================== */
app.post("/api/chat", (req, res) => {
  const msg = req.body.message.toLowerCase();

  let reply = "I can help with appointments and clinic info.";

  if (msg.includes("book")) reply = "You can book an appointment in the dashboard.";
  if (msg.includes("doctor")) reply = "We have general, dental, pediatric specialists.";
  if (msg.includes("emergency")) reply = "Call emergency number immediately.";
  if (msg.includes("hello")) reply = "Hello 👋 Welcome to Clinic SaaS v2";

  res.json({ reply });
});

app.listen(3000, () => console.log("Clinic SaaS v2 running"));
