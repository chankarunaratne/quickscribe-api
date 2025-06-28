# QuickScribe API

A standalone API-only backend service for QuickScribe that accepts article content and returns AI-generated summaries using OpenRouter's Llama 3.8B model.

## Features

- **POST** `/api/summarize` - Generate AI summaries from article content
- **GET** `/health` - Health check endpoint
- CORS enabled for all origins
- Content validation and truncation (4000 character limit)
- Word count calculation
- Error handling and logging

## Quick Start

### Prerequisites

- Node.js 18+
- OpenRouter API key

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   export OPENROUTER_API_KEY="your_openrouter_api_key_here"
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`

## API Documentation

### POST /api/summarize

Generates an AI summary of the provided article content.

**Request Body:**

```json
{
  "content": "string", // Required: Article text content
  "title": "string", // Optional: Article title (default: "Untitled Article")
  "author": "string" // Optional: Article author (default: "Unknown Author")
}
```

**Response:**

```json
{
  "summary": "string",     // AI-generated summary
  "title": "string",       // Echoed or default title
  "author": "string",      // Echoed or default author
  "wordCount": number      // Word count of cleaned content
}
```

**Error Responses:**

- `400` - Missing or invalid content
- `500` - AI service error or server error

### GET /health

Health check endpoint to verify the API is running.

**Response:**

```json
{
  "status": "ok",
  "message": "QuickScribe API is running"
}
```

## Development

### Local Development

```bash
npm run dev
```

### Testing the API

You can test the API using curl:

```bash
curl -X POST http://localhost:3000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Your article content here...",
    "title": "Sample Article",
    "author": "John Doe"
  }'
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy to Vercel:

   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard:

   - `OPENROUTER_API_KEY`: Your OpenRouter API key

4. Your API will be available at: `https://your-project.vercel.app`

### Environment Variables

- `OPENROUTER_API_KEY` (required): Your OpenRouter API key
- `PORT` (optional): Server port (default: 3000)

## Technical Details

- **Framework**: Express.js
- **AI Provider**: OpenRouter with Llama 3.8B Instruct model
- **Content Limit**: 4000 characters
- **CORS**: Enabled for all origins
- **Deployment**: Vercel serverless functions

## Error Handling

The API includes comprehensive error handling for:

- Missing or invalid content
- OpenRouter API failures
- Network errors
- Server errors

All errors return appropriate HTTP status codes and descriptive error messages.

## License

MIT
