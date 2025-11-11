require('dotenv').config();
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Setup Telegram bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
const SOLANA_RPC = process.env.SOLANA_RPC_URL;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Replace this with your real mint authority address
const MINT_AUTHORITY = "YourMintAuthorityAddress";

async function checkNewTokens() {
  try {
    const response = await axios.post(SOLANA_RPC, {
      jsonrpc: "2.0",
      id: 1,
      method: "getSignaturesForAddress",
      params: [MINT_AUTHORITY, { limit: 5 }]
    });

    const tokens = response.data.result;

    for (let token of tokens) {
      const message = `🚀 New token detected!\nSignature: ${token.signature}\nSlot: ${token.slot}`;
      bot.sendMessage(CHAT_ID, message);
    }
  } catch (error) {
    console.error("Error checking tokens:", error.message);
  }
}

// Run every 5 minutes
setInterval(checkNewTokens, 300000);

// Keep Railway app alive
app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🫏 SaveTheDonkeyBot is online and watching Solana! You’ll get alerts when new tokens are minted.");
});
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🫏 SaveTheDonkeyBot is online and watching Solana! You’ll get alerts when new tokens are minted.");
});


