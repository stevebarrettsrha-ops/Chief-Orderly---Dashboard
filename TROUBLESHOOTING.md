# 🔧 Google Apps Script Troubleshooting Guide

## 🚨 "App Script Not Working" - Diagnostic Steps

Follow these steps in order to diagnose and fix your Google Apps Script issues.

---

## Step 1: Run the Test Function

This will verify if your Google Apps Script can access all the sheets.

### How to Run:
1. Go to https://script.google.com
2. Open your "Chief Orderly Dashboard" project
3. In the function dropdown (top toolbar), select **`testSheetAccess`**
4. Click **▶ Run**
5. If prompted, click **"Review permissions"** and authorize
6. After it runs, click **"Execution log"** (bottom left) or **View** > **Logs**

### What to Look For:
```
✅ Staff sheet accessible - X rows
✅ Leave Records sheet accessible - X rows
✅ Schedule Data sheet accessible - X rows
✅ Time Tracking sheet accessible - X rows
```

### If You See Errors:
Look for messages like:
- `❌ Staff sheet error: Exception: You do not have permission...`
- `❌ Leave Records error: Exception: Requested entity was not found...`

**Common errors and solutions below** ⬇️

---

## Step 2: Verify Sheet IDs

### How to Check Your Sheet IDs:

1. **Staff Sheet:**
   - Open: https://docs.google.com/spreadsheets/d/15BXIEtJViCna0zQdrrPXHXqN2bkddPNNEFGcS33PUK0/edit
   - If this opens your staff sheet ✅ - ID is correct
   - If it says "File not found" ❌ - Wrong ID

2. **Leave Records Sheet:**
   - Open: https://docs.google.com/spreadsheets/d/1z1OZRPXqbVMBBZg4UacWK9a1H_KSdC7_srHbLZ0vKp0/edit
   - Verify this is your Leave Records sheet

3. **Schedule Data Sheet:**
   - Open: https://docs.google.com/spreadsheets/d/19Vc3_ntR6C1MadhbpjPZmWenOKbVrH_heqE_2Nxstd8/edit
   - Verify this is your Schedule Data sheet

4. **Time Tracking Sheet:**
   - Open: https://docs.google.com/spreadsheets/d/1RTHfdCg0FvpbHKbbEz2pb1FJUoVZvKkRqqbuSb8VboY/edit
   - Verify this is your Time Tracking sheet

### If Any Links Don't Work:
The sheet ID is wrong! Update `SHEET_IDS` in your Google Apps Script.

---

## Step 3: Verify Deployment

### Check Your Current Deployment:
1. Go to https://script.google.com
2. Open your project
3. Click **"Deploy"** > **"Manage deployments"**

### What You Should See:
- **Type:** Web app
- **Version:** @1 or higher
- **Who has access:** Anyone
- **Execute as:** Me (your email)

### If No Deployments Exist:
You haven't deployed yet! Follow `GOOGLE-APPS-SCRIPT-SETUP.md` Step 5.

### If Multiple Deployments Exist:
Delete old ones:
1. Click **🗑️** (trash icon) next to old deployments
2. Keep only the latest one

---

## Step 4: Test the Web App URL

### Copy Your Web App URL:
1. Go to **"Deploy"** > **"Manage deployments"**
2. Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

### Test It Directly:
1. Open a new browser tab
2. Paste the Web App URL
3. Press Enter

### Expected Result:
You should see JSON data like:
```json
{
  "status": "success",
  "data": [
    ["Name", "TRN", "Department", ...],
    ["John Doe", "12345", "Nursing", ...]
  ]
}
```

### If You See an Error:
- **"Authorization required"** → Script needs authorization (see Step 1)
- **"Script has been disabled"** → Redeploy the script
- **"Invalid action"** → Old code is deployed, update and redeploy

---

## Step 5: Check Browser Console for Errors

### How to Open Console:
1. Open your dashboard in a browser
2. Press **F12** (or right-click > Inspect)
3. Click **"Console"** tab

### What to Look For:

#### ✅ Good (Working):
```
🔥 Fetching latest data...
✅ Loaded 15 staff members
```

#### ❌ Bad (Not Working):
```
Failed to fetch data
HTTP error! status: 404
CORS error
Network error
```

### Common Console Errors:

#### Error: `Failed to fetch` or `net::ERR_FAILED`
**Cause:** Wrong SCRIPT_URL in index.html
**Fix:**
1. Copy the correct Web App URL from Google Apps Script
2. Update `CONFIG.SCRIPT_URL` in index.html (line ~2501)

#### Error: `HTTP error! status: 404`
**Cause:** Script not deployed or URL is wrong
**Fix:** Verify deployment exists and URL is correct

#### Error: `CORS error` or `Access-Control-Allow-Origin`
**Cause:** Script deployed with wrong settings
**Fix:**
1. Redeploy with "Who has access" = "Anyone"
2. NOT "Anyone with Google Account"

---

## Step 6: Verify CONFIG.SCRIPT_URL in index.html

### Check Your Dashboard Config:
1. Open `index.html`
2. Find line ~2501
3. Look for:
   ```javascript
   const CONFIG = {
     SCRIPT_URL: 'https://script.google.com/macros/s/...',
     ...
   }
   ```

### Verify the URL:
1. Copy the `SCRIPT_URL` value
2. Open it in a new browser tab
3. You should see JSON data (staff list)

### If URL Returns Error:
The URL is wrong or the script isn't deployed correctly.

**Get the correct URL:**
1. Go to Google Apps Script
2. **"Deploy"** > **"Manage deployments"**
3. Copy the **Web app URL**
4. Update `CONFIG.SCRIPT_URL` in index.html
5. Save and refresh your dashboard

---

## Common Error Messages & Solutions

### Error: "You do not have permission to call SpreadsheetApp.openById"

**Cause:** Script not authorized
**Fix:**
1. Go to Google Apps Script
2. Click **"Run"** > Select `testSheetAccess`
3. Click **"Review permissions"**
4. Click **"Advanced"** > **"Go to [Project] (unsafe)"**
5. Click **"Allow"**

### Error: "Requested entity was not found"

**Cause:** Sheet ID is wrong or you don't have access
**Fix:**
1. Double-check sheet IDs in `SHEET_IDS`
2. Make sure you have "Viewer" or "Editor" access to all sheets
3. Try opening each sheet URL in your browser

### Error: "Exception: Service invoked too many times"

**Cause:** Google Apps Script quota exceeded
**Fix:**
1. Wait a few minutes
2. This happens if you refresh too many times
3. Consider adding rate limiting

### Error: "Failed to fetch data" in Dashboard

**Cause:** Multiple possible issues
**Fix (in order):**
1. Check browser console for specific error
2. Verify SCRIPT_URL is correct
3. Test the Web App URL directly in browser
4. Check Google Apps Script execution logs
5. Run `testSheetAccess()` function

---

## Step 7: Check Google Apps Script Execution Logs

### How to View Logs:
1. Go to https://script.google.com
2. Open your project
3. Click **"Executions"** (left sidebar)

### What to Look For:

#### ✅ Successful Executions:
- Status: **Completed**
- No errors

#### ❌ Failed Executions:
- Status: **Failed**
- Click on it to see error details

### Common Logged Errors:
- **"ReferenceError: SHEET_IDS is not defined"** → Code not saved properly
- **"Exception: You do not have permission"** → Not authorized (see above)
- **"Requested entity was not found"** → Wrong sheet ID

---

## Step 8: Verify Sheet Headers

Your Google Sheets must have the correct headers.

### Staff Sheet (Row 1):
```
Name | TRN | Department | Day Off | Sick Leave | Claims | Departmental Leave | Overtime | Late | Vacation Leave | Role
```

### Leave Records Sheet (Row 1):
```
ID | Staff TRN | Staff Name | Leave Type | Start Date | End Date | Reason | Status | Created At
```

### Schedule Data Sheet (Row 1):
```
Date | Department | Staff TRN | Staff Name | Time In | Time Out
```

### Time Tracking Sheet (Row 1):
```
ID | Type | Staff TRN | Staff Name | Date | Amount | Hours | Notes | Timestamp
```

**NOTE:** If sheets are empty, headers will be created automatically when you add the first record.

---

## Step 9: Clear Cache and Restart

Sometimes cached data causes issues.

### Clear Browser Cache:
1. Press **Ctrl+Shift+Delete**
2. Select "Cached images and files"
3. Click "Clear data"

### Clear Session Storage:
1. Open browser console (F12)
2. Run this command:
   ```javascript
   sessionStorage.clear();
   localStorage.clear();
   location.reload();
   ```

### Hard Refresh:
- Windows: **Ctrl+Shift+R**
- Mac: **Cmd+Shift+R**

---

## Step 10: Redeploy Everything

If nothing else works, start fresh.

### Redeploy Google Apps Script:
1. Go to https://script.google.com
2. Open your project
3. **"Deploy"** > **"Manage deployments"**
4. Delete all deployments
5. **"Deploy"** > **"New deployment"**
6. Type: "Web app"
7. Execute as: "Me"
8. Who has access: "Anyone"
9. Click **"Deploy"**
10. Copy the new Web App URL

### Update index.html:
1. Paste the new Web App URL into `CONFIG.SCRIPT_URL`
2. Save the file
3. Refresh the dashboard

---

## 📊 Quick Diagnostic Checklist

Run through this checklist:

- [ ] Google Apps Script is saved
- [ ] Google Apps Script is deployed as Web App
- [ ] "Who has access" is set to "Anyone"
- [ ] `testSheetAccess()` function runs without errors
- [ ] All sheet IDs are correct
- [ ] You have access to all sheets (can open them in browser)
- [ ] Web App URL returns JSON data when opened directly
- [ ] `CONFIG.SCRIPT_URL` in index.html matches Web App URL
- [ ] Browser console shows no errors
- [ ] Cache is cleared

---

## 🆘 Still Not Working?

### Collect This Information:
1. **Browser console error message** (exact text)
2. **Google Apps Script execution log** (screenshot)
3. **Result of `testSheetAccess()` function**
4. **Web App URL response** (what you see when you open it)

### Check These:
1. Can you manually open all the sheet URLs in your browser?
2. Does the Web App URL work when you open it directly?
3. Do you see any errors in Google Apps Script "Executions" log?

---

## 🎯 Most Common Issue

**90% of the time, the issue is:**

The Web App URL in `index.html` doesn't match the actual deployed URL.

**How to fix:**
1. Get Web App URL from Google Apps Script deployment
2. Update `CONFIG.SCRIPT_URL` in index.html
3. Save and refresh

---

## ✅ Expected Working Behavior

When everything is working correctly:

1. **Dashboard loads** → Login screen appears
2. **After login** → "🔥 Fetching latest data..." message
3. **After fetch** → "✅ Loaded X staff members" message
4. **Staff Monitor** → Shows list of all staff
5. **Scheduling** → Staff dropdown is populated
6. **Browser Console** → No errors
7. **Google Apps Script Executions** → Shows successful executions
