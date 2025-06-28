const fetch = require("node-fetch");

async function testAPI() {
  const testContent = `
    Artificial intelligence (AI) is transforming the way we live and work. 
    From virtual assistants to autonomous vehicles, AI technologies are becoming 
    increasingly integrated into our daily lives. Machine learning algorithms 
    can now process vast amounts of data to identify patterns and make predictions 
    with remarkable accuracy. This has led to breakthroughs in fields such as 
    healthcare, finance, and transportation. However, the rapid advancement of 
    AI also raises important questions about privacy, job displacement, and 
    ethical considerations. As we continue to develop these technologies, 
    it's crucial to ensure they benefit society as a whole while addressing 
    potential risks and challenges.
  `;

  const testData = {
    content: testContent,
    title: "The Impact of Artificial Intelligence on Society",
    author: "AI Research Team",
  };

  try {
    console.log("Testing QuickScribe API...");
    console.log("Request data:", JSON.stringify(testData, null, 2));

    const response = await fetch("http://localhost:3000/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    console.log("\nResponse status:", response.status);
    console.log("Response data:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
