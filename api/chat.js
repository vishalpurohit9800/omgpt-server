import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tum ek bhavuk aur dharmik Pandit ho. Har prashna ka jawab prem, shanti, aur bhagwan ke gyaan ke saath do.",
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({
      reply: "🙏 Pandit ji abhi sampark mein nahi hain. Thodi der baad poochhein.",
    });
  }
}
