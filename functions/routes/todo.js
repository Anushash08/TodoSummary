import express from "express";
import OpenAI from "openai";
import axios from "axios";
import db from "../firebase.js";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// GET all todos
router.get("/todos", async (req, res) => {
  const snapshot = await db.collection("todos").get();
  const todos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.json(todos);
});

// POST a new todo
router.post("/todos", async (req, res) => {
  const { title } = req.body;
  const docRef = await db.collection("todos").add({ title });
  res.json({ id: docRef.id, title });
});

// DELETE a todo
router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await db.collection("todos").doc(id).delete();
  res.json({ success: true });
});





import dotenv from 'dotenv';
dotenv.config();

// const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
// const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL;


const DEEPSEEK_API_KEY = "sk-a217b4adca8145fcbeec2831751d7f14";
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
router.post("/summarize", async (req, res) => {
    console.log("DEEPSEEK_API_KEY in todo.js:", process.env.DEEPSEEK_API_KEY);
console.log("DEEPSEEK_API_URL in todo.js:", process.env.DEEPSEEK_API_URL);
  try {
    console.log("url   ",DEEPSEEK_API_URL)
    const snapshot = await db.collection("todos").get();
    const todos = snapshot.docs.map((doc) => doc.data().title);

    if (!todos.length) {
      return res.status(400).json({ error: "No todos to summarize." });
    }

    const todoListText = todos.map((t) => `- ${t}`).join("\n");

    const prompt = `Summarize the following to-do items into a concise, clear summary:\n${todoListText}\nSummary:`;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes to-do lists clearly and briefly.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 200,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("DeepSeek Error:", data);
      return res.status(500).json({ error: data.error?.message || "Failed to generate summary." });
    }

    const summary = data.choices?.[0]?.message?.content || "No summary generated.";
    res.json({ success: true, summary });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to summarize todos." });
  }
});


export default router;
