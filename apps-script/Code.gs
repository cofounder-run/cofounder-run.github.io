// Google Apps Script: Waitlist form handler
// Saves Telegram usernames to the active Google Sheet and notifies via Telegram.
//
// Setup:
// 1. Create a new Google Sheet
// 2. Extensions → Apps Script → paste this code
// 3. Add Script Properties (Project Settings → Script Properties):
//    - TELEGRAM_BOT_TOKEN  → your bot token
//    - TELEGRAM_CHAT_ID    → chat id where notifications go
// 4. Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the deployment URL into index.html (APPS_SCRIPT_URL)

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var telegram = (body.telegram || '').trim();

    if (!telegram) {
      return jsonResponse({ ok: false, error: 'Please enter your Telegram username' });
    }

    // Normalize: add @ if missing
    if (telegram.charAt(0) !== '@') {
      telegram = '@' + telegram;
    }

    // Save to sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([telegram, new Date().toISOString()]);

    // Notify Telegram
    sendTelegram('🚀 New waitlist signup: ' + telegram);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.message });
  }
}

function sendTelegram(text) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('TELEGRAM_BOT_TOKEN');
  var chatId = props.getProperty('TELEGRAM_CHAT_ID');

  if (!token || !chatId) return;

  try {
    UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ chat_id: chatId, text: text })
    });
  } catch (err) {
    console.error('Telegram error: ' + err.message);
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
