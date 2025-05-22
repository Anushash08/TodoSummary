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

// POST /summarize - Use OpenAI and send to Slack
// router.post("/summarize", async (req, res) => {
//   try {
//     const snapshot = await db.collection("todos").get();
//     const todos = snapshot.docs.map((doc) => doc.data().title);

//     const prompt = `Summarize the following TODOs:\n\n${todos.join("\n")}`;

//     const aiResponse = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     });

//     const summary = aiResponse.choices[0].message.content;

//     // Send to Slack
//     await axios.post(process.env.SLACK_WEBHOOK_URL, {
//       text: `📝 *Todo Summary:*\n${summary}`,
//     });

//     res.json({ success: true, summary });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to summarize and send to Slack." });
//   }
// // });
// const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
// const DEEPSEEK_API_KEY = "sk-a217b4adca8145fcbeec2831751d7f14";
const DEEPSEEK_API_KEY  = "sk-a217b4adca8145fcbeec2831751d7f14"
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

// router.post("/summarize", async (req, res) => {
//   try {
//     const snapshot = await db.collection("todos").get();
//     const todos = snapshot.docs.map((doc) => doc.data().title);

//     if (!todos.length) {
//       return res.status(400).json({ error: "No todos to summarize." });
//     }

//     // Prepare prompt as bullet list
//     const todoListText = todos.map((t) => `- ${t}`).join("\n");

//     const prompt = `Summarize the following to-do items into a concise, clear summary:\n${todoListText}\nSummary:`;

//     // Call DeepSeek API
//     const response = await axios.post(
//       DEEPSEEK_API_URL,
//       {
//         model: "deepseek-chat",
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are a helpful assistant that summarizes to-do lists clearly and briefly.",
//           },
//           { role: "user", content: prompt },
//         ],
//         max_tokens: 150,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const summary = response.data.choices[0].message.content;

//     // Send summary to Slack webhook
//     await axios.post(process.env.SLACK_WEBHOOK_URL, {
//       text: `📝 *Todo Summary:*\n${summary}`,
//     });

//     res.json({ success: true, summary });
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     res.status(500).json({ error: "Failed to summarize and send to Slack." });
//   }
// });

router.post("/summarize", async (req, res) => {
  try {
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
