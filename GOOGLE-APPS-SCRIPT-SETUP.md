# 🚀 Google Apps Script Setup - CRITICAL FIX

## ⚠️ IMPORTANT: This fixes the "Failed to fetch data" error in Staff Monitor

---

## 📋 What Was Fixed

### Issues Resolved:
1. ✅ **Missing staff sheet ID** - Updated with your actual sheet ID: `15BXIEtJViCna0zQdrrPXHXqN2bkddPNNEFGcS33PUK0`
2. ✅ **Missing getStaffFromSheet() function** - Added handler to fetch staff data
3. ✅ **Invalid action error** - Updated doGet() to handle staff data requests

---

## 🛠️ DEPLOYMENT STEPS (Follow Exactly)

### Step 1: Open Google Apps Script
1. Go to: https://script.google.com
2. Click **"New Project"** (or open your existing project if you have one)

### Step 2: Copy the Code
1. **Delete all existing code** in the editor
2. **Open the file:** `google-apps-script-code.gs` from this repository
3. **Copy ALL the code** (Ctrl+A, Ctrl+C)
4. **Paste it** into the Google Apps Script editor (Ctrl+V)

### Step 3: Verify Sheet IDs
The script is already configured with your sheet IDs:
```javascript
const SHEET_IDS = {
  STAFF: '15BXIEtJViCna0zQdrrPXHXqN2bkddPNNEFGcS33PUK0',  ✅ Your staff sheet
  LEAVE_RECORDS: '1z1OZRPXqbVMBBZg4UacWK9a1H_KSdC7_srHbLZ0vKp0',  ✅ Leave records
  SCHEDULE_DATA: '19Vc3_ntR6C1MadhbpjPZmWenOKbVrH_heqE_2Nxstd8',  ✅ Schedule data
  TIME_TRACKING: '1RTHfdCg0FvpbHKbbEz2pb1FJUoVZvKkRqqbuSb8VboY',  ✅ Time tracking
  CREDENTIALS: '1FFLLw_xoKqhyFVOAzcKGKcI-9UloOOuu'  ✅ Credentials
};
```

**Double-check these IDs match your Google Sheets!**

### Step 4: Save the Project
1. Click the **💾 Save** icon (or press Ctrl+S)
2. Give your project a name like: **"Chief Orderly Dashboard API"**

### Step 5: Deploy as Web App
1. Click **"Deploy"** → **"New deployment"**
2. Click the ⚙️ gear icon next to "Select type"
3. Choose **"Web app"**
4. Configure settings:
   - **Description:** "Chief Orderly Dashboard Backend v1"
   - **Execute as:** **"Me"** (your email)
   - **Who has access:** **"Anyone"**
5. Click **"Deploy"**

### Step 6: Authorize the Script
1. You'll see a popup asking for authorization
2. Click **"Authorize access"**
3. Choose your Google account
4. Click **"Advanced"** (if you see a warning)
5. Click **"Go to [Project Name] (unsafe)"** (This is YOUR script, it's safe!)
6. Click **"Allow"** to grant permissions

### Step 7: Copy the Web App URL
1. After deployment, you'll see a **"Web app URL"**
2. It looks like: `https://script.google.com/macros/s/AKfycby...../exec`
3. **COPY THIS URL** - you'll need it next!

### Step 8: Update index.html
1. Open `index.html` in your code editor
2. Find line ~2501 with `CONFIG.SCRIPT_URL`
3. **Replace** the old URL with your new Web App URL:
   ```javascript
   const CONFIG = {
     SCRIPT_URL: 'https://script.google.com/macros/s/YOUR-NEW-URL-HERE/exec',
     USE_GOOGLE_SHEETS: true,
     SYNC_SCHEDULES_TO_SHEETS: true,
     SYNC_LEAVES_TO_SHEETS: true,
     SYNC_TIME_TRACKING_TO_SHEETS: true,
     USE_FALLBACK_CREDENTIALS: true
   };
   ```

### Step 9: Test the Dashboard
1. Save `index.html`
2. Open your dashboard in a browser (or refresh if already open)
3. Log in
4. You should see: **"✅ Loaded X staff members"**
5. The Staff Monitor section should now display your staff data!

---

## 🔍 Verify Google Sheets Structure

Make sure your **Staff sheet** has these column headers (Row 1):

```
Name | TRN | Department | Day Off | Sick Leave | Claims | Departmental Leave | Overtime | Late | Vacation Leave | Role
```

### Example data:
```
Name          | TRN   | Department | Day Off | Sick Leave | Claims | ... | Role
John Doe      | 12345 | Nursing    | 0       | 2          | 1      | ... | Staff
Jane Smith    | 67890 | Admin      | 1       | 0          | 0      | ... | Admin
```

---

## 🚨 Troubleshooting

### Error: "Failed to fetch data"
**Cause:** Script URL is incorrect or not deployed yet
**Fix:**
1. Verify the Web App URL in `index.html` matches your deployment URL
2. Make sure you clicked "Deploy" and copied the correct URL
3. Check browser console (F12) for detailed error messages

### Error: "Invalid action"
**Cause:** Old Google Apps Script code still deployed
**Fix:**
1. Go to Google Apps Script
2. Click "Deploy" → "Manage deployments"
3. Delete old deployments
4. Create a new deployment with the updated code

### Error: "Exception: You do not have permission to call SpreadsheetApp.openById"
**Cause:** Script needs authorization
**Fix:**
1. Go to Google Apps Script
2. Click "Run" → "Run function" → "doGet"
3. Authorize the script when prompted
4. Make sure your Google account has access to ALL the sheets listed in SHEET_IDS

### Data shows but won't update
**Cause:** Multiple deployments or caching
**Fix:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Clear sessionStorage: Open browser console (F12) and run:
   ```javascript
   sessionStorage.clear();
   location.reload();
   ```
3. Check Google Sheets to verify data exists

### Script runs but returns empty data
**Cause:** Sheet ID is incorrect or sheet is empty
**Fix:**
1. Double-check the sheet ID in `SHEET_IDS.STAFF`
2. Make sure the staff sheet has data (at least headers in row 1)
3. Verify your Google account has "Viewer" or "Editor" access to the sheet

---

## ✅ Expected Results After Setup

- ✅ Staff Monitor loads and displays all staff members
- ✅ Scheduling dropdown shows all staff members
- ✅ Leave management can link to staff
- ✅ Time tracking can link to staff
- ✅ Data syncs to Google Sheets when changes are made
- ✅ No "Failed to fetch" errors

---

## 📞 Still Having Issues?

1. **Check browser console** (F12) for error messages
2. **Check Google Apps Script logs:**
   - Go to https://script.google.com
   - Open your project
   - Click "Executions" on the left sidebar
   - Check for failed executions and error messages
3. **Verify permissions:**
   - Make sure your Google account can access all sheets
   - Try opening each sheet URL directly in your browser

---

## 🔄 Redeploying After Code Changes

If you make changes to the Google Apps Script code:

1. Save the changes in the script editor
2. Click **"Deploy"** → **"Manage deployments"**
3. Click the ✏️ edit icon next to your existing deployment
4. Click **"Version"** → **"New version"**
5. Click **"Deploy"**
6. The Web App URL stays the same - no need to update `index.html`

---

## ☁️ Google Drive Backups

The dashboard can save full backups (staff, leaves, schedule, time tracking, reminders, PMAS documents) as JSON files into a Google Drive folder called **"Chief Orderly Backups"**. The folder is created automatically in the Drive of the account that deployed the Apps Script.

**Setup:**

1. Make sure the latest `google-apps-script-code.gs` is deployed (it includes the `saveBackupToDrive`, `listDriveBackups`, and `getDriveBackup` actions). If you deployed an older version, redeploy — see "Redeploying After Code Changes" above.
2. The first time a backup runs, Google will ask the script for permission to access Google Drive — approve it.
3. In the dashboard, open **Google Drive Backup** in the sidebar (under Tools):
   - Paste your Web App URL into the settings field and click **Save Settings**
   - Click **Test Connection** — the top bar pill turns green: **☁️ Connected**
   - Click **Back Up Now** to create a backup, or leave **auto-backup** enabled so every 💾 Save also pushes a backup to Drive
4. Use **Restore** next to any backup in the list to load that snapshot back into the dashboard, or **Open Drive Folder** to see the files in Google Drive.

The 30 most recent backups are kept; older ones are moved to the Drive trash automatically (adjust `DRIVE_BACKUP.MAX_BACKUPS` in the script).

---

## 🎉 You're All Set!

After completing these steps, your dashboard should work perfectly. All data will sync across dashboards and to Google Sheets!
