/**
 * Global variable for the Google Sheet Name where submissions are recorded.
 */

// 🔑 It's best practice to store secrets in Script Properties.
// Go to Project Settings > Script Properties and add a property with the name 'SECRET_TOKEN'.
const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
const SECRET_TOKEN = SCRIPT_PROPERTIES.getProperty("SECRET_TOKEN");
const SHEET_NAME = SCRIPT_PROPERTIES.getProperty("SHEET_NAME");
const SPREADSHEET_ID = SCRIPT_PROPERTIES.getProperty("SPREADSHEET_ID");

/**
 * Handles HTTP POST requests sent from the React contact form.
 * This function processes the form data and appends it to the designated Google Sheet.
 * @param {object} e The event object containing form data from the POST request.
 */
function doPost(e) {
  if (!e || !e.parameter) {
    Logger.log("ERROR: Received request with no parameters.");
    return ContentService.createTextOutput(
      JSON.stringify({ error: "No data received." })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const data = e.parameter;

  // 🔑 TOKEN VALIDATION: Must match the token sent from the React app.
  if (data.secret_token !== SECRET_TOKEN) {
    Logger.log(
      "SECURITY ALERT: Submission blocked due to invalid token."
    );
    // Return a generic error to prevent bots from knowing the token is the issue
    return ContentService.createTextOutput(
      JSON.stringify({ error: "Unauthorized submission." })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    // 🔑 Open the sheet explicitly using its ID for reliability
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      Logger.log("ERROR: Sheet tab named '" + SHEET_NAME + "' was not found.");
      // If sheet is null, we must exit gracefully
      return ContentService.createTextOutput(
        JSON.stringify({ error: "Sheet tab not found." })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const rowData = [
      new Date(), // Timestamp of submission
      data.name,
      data.email,
      data.subject,
      data.message,
    ];

    // Append the new row to the sheet
    sheet.appendRow(rowData);

    Logger.log("SUCCESS: Data successfully written to sheet.");
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Form submitted successfully." })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("FATAL ERROR during execution: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ error: "An unexpected error occurred." })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
