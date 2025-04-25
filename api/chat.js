export default async function handler(req, res) {
  const { userMessage } = req.body;

  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are NexioAI, a helpful assistant for salon and med spa clients.' },
        { role: 'user', content: userMessage }
      ]
    }),
  });

  const data = await openaiRes.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
