const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

// Helper function to count words
function countWords(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

// Helper function to clean and truncate content
function cleanContent(content) {
  if (!content || typeof content !== "string") {
    return "";
  }

  // Remove extra whitespace and normalize
  const cleaned = content.trim().replace(/\s+/g, " ");

  // Limit to 4000 characters
  return cleaned.length > 4000 ? cleaned.substring(0, 4000) : cleaned;
}

// POST /api/summarize
router.post("/summarize", async (req, res) => {
  try {
    const {
      content,
      title = "Untitled Article",
      author = "Unknown Author",
    } = req.body;

    // Validate required content
    if (
      !content ||
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Content is required and must be a non-empty string",
      });
    }

    // Clean and truncate content
    const cleanedContent = cleanContent(content);
    const wordCount = countWords(cleanedContent);

    // Check if we have an API key
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Configuration Error",
        message: "OpenRouter API key is not configured",
      });
    }

    // Prepare the prompt for summarization
    const systemPrompt = `You are a helpful assistant that creates concise, informative summaries of articles. 
    Provide a clear and well-structured summary that captures the main points and key insights. 
    Use bullet points or a short paragraph format. Keep the summary focused and avoid unnecessary details.`;

    const userPrompt = `Please summarize the following article:

Title: ${title}
Author: ${author}

Content:
${cleanedContent}

Please provide a concise summary that captures the main points and key insights.`;

    // Call OpenRouter API
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://quickscribe-api.vercel.app",
          "X-Title": "QuickScribe API",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: userPrompt,
            },
          ],
          max_tokens: 500,
          temperature: 0.3,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error:", response.status, errorText);
      return res.status(500).json({
        error: "AI Service Error",
        message: "Failed to generate summary. Please try again later.",
      });
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return res.status(500).json({
        error: "AI Service Error",
        message: "Invalid response from AI service",
      });
    }

    const summary = data.choices[0].message.content.trim();

    // Return the response
    res.json({
      summary,
      title,
      author,
      wordCount,
    });
  } catch (error) {
    console.error("Summarize endpoint error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while processing your request",
    });
  }
});

module.exports = router;
