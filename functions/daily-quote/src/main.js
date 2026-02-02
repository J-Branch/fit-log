import { Client, TablesDB, Query } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
  const QUOTES_TABLE_ID = process.env.APPWRITE_TABLE_ID;
  const DAILY_TABLE_ID = process.env.APPWRITE_DAILY_TABLE_ID;

  const TOTAL_QUOTES = 858; 

  try {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const db = new TablesDB(client);

    const randomIndex = Math.floor(Math.random() * TOTAL_QUOTES);
    log(`Random quote index: ${randomIndex}`);

    const quoteList = await db.listRows({
      databaseId: DATABASE_ID,
      tableId: QUOTES_TABLE_ID,
      queries: [
        Query.orderAsc("$id"),
        Query.limit(1),
        Query.offset(randomIndex)
      ]
    });

    log(`Quote ID returned: ${quoteList.rows[0].$id}`);

    
    
    if (!quoteList.rows.length) throw new Error("No quote found at that index.");
    
    const randomQuote = quoteList.rows[0];
    log("Fetched quote row:", JSON.stringify(randomQuote, null, 2));
    
    const text = randomQuote.text ?? randomQuote.data?.text;
    const author = randomQuote.author ?? randomQuote.data?.author;
    
    if (!text || !author) throw new Error("Quote missing text or author field.");
    
    await db.updateRow({
      databaseId: DATABASE_ID,
      tableId: DAILY_TABLE_ID,
      rowId: "current",
      data: {
        text,
        author,
        date: new Date().toISOString()
      }
    });
    

    log(`Updated daily quote: "${text}" - ${author}`);

    return res.json({
      message: "Daily quote updated successfully",
      quote: { text, author }
    });

  } catch (err) {
    error("Error setting daily quote: " + err.message);
    return res.json({ error: err.message });
  }
};
