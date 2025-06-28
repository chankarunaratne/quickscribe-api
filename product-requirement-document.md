# QuickScribe API - PRD

## Overview

Create a standalone API-only backend service for QuickScribe that accepts article content and returns AI-generated summaries. This service will be consumed by the QuickScribe Chrome extension for seamless article summarization without frontend overhead.

## Goals

- Provide a simple, robust REST API endpoint `/api/summarize`
- Accept JSON payload with article `content`, optional `title` and `author`
- Return a concise AI-generated summary with metadata
- Enable CORS for all origins to allow requests from the Chrome extension and any other clients
- Deploy on Vercel using a minimal Node.js + Express backend

## Features

### Endpoint

- **POST** `/api/summarize`
  - Request body (JSON):
    ```json
    {
      "content": "string", // Article text content (required)
      "title": "string", // Optional article title
      "author": "string" // Optional article author
    }
    ```
  - Response body (JSON):
    ```json
    {
      "summary": "string",      // AI-generated summary of the content
      "title": "string",        // Echoed or default title
      "author": "string",       // Echoed or default author
      "wordCount": number       // Word count of cleaned content
    }
    ```
  - Error responses:
    - 400 if `content` is missing or empty
    - 500 if AI summarization fails or server error

### CORS

- Allow all origins via `Access-Control-Allow-Origin: *`
- Handle preflight `OPTIONS` requests properly with required headers

### AI Integration

- Use OpenRouter API for AI summarization with the model `"meta-llama/llama-3-8b-instruct"`
- Limit input content to 4000 characters
- Use a system prompt to instruct concise summary in bullet points or short paragraph

## Tech Stack

- Node.js
- Express.js
- `cors` package to handle CORS headers easily
- `node-fetch` for calling OpenRouter API
- Deployed on Vercel as a serverless Node.js function

## Development Details

- Project root folder: `quickscribe-api`
- Main server file: `index.js`
- API route handler: `api/summarize.js`
- Environment variable: `OPENROUTER_API_KEY`
- Vercel config file: `vercel.json` for correct build and routing

## Deployment

- Deploy on Vercel
- Set environment variable `OPENROUTER_API_KEY` in Vercel dashboard
- Endpoint URL example: `https://your-vercel-project.vercel.app/api/summarize`

## Success Criteria

- The endpoint correctly accepts article content and returns valid AI summaries
- CORS errors are resolved; extension can successfully call the API from any webpage context
- The API response times are acceptable for user experience (~1-3 seconds)
- The Chrome extension integration works flawlessly with the new API endpoint

---

**End of PRD**
