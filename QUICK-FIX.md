# ⚡ QUICK FIX - App Script Not Working

## 🎯 Do These 3 Steps RIGHT NOW

---

## ✅ STEP 1: Test Your Google Apps Script

### Go to: https://script.google.com
1. Open your "Chief Orderly Dashboard" project
2. At the top, find the function dropdown
3. Select **`testSheetAccess`**
4. Click **▶ Run**
5. If it asks for permissions, click **"Review permissions"** → **"Advanced"** → **"Go to [project]"** → **"Allow"**

### Look at the Execution Log:
- Click **View** > **Logs** (or bottom left corner)
- You should see checkmarks (✅) for all sheets

### If You See ❌ (Red X):
**Read the error message** - it tells you exactly what's wrong:
- "You do not have permission" → Need to authorize (you just did in step 4)
- "Requested entity was not found" → Wrong sheet ID

---

## ✅ STEP 2: Get Your Web App URL

### In Google Apps Script:
1. Click **"Deploy"** > **"Manage deployments"**
2. You should see a deployment with:
   - Type: **Web app**
   - Who has access: **Anyone**

### If You Don't See a Deployment:
You need to deploy! Follow these:
1. Click **"Deploy"** > **"New deployment"**
2. Click ⚙️ gear > Select **"Web app"**
3. Execute as: **"Me"**
4. Who has access: **"Anyone"**
5. Click **"Deploy"**

### Copy the Web App URL:
- It looks like: `https://script.google.com/macros/s/AKfycby...../exec`
- **COPY THIS ENTIRE URL**

### Test It:
1. Paste the URL in a new browser tab
2. Press Enter
3. You should see JSON data (staff list)

**If it doesn't show data, there's a problem with the script deployment.**

---

## ✅ STEP 3: Update Your Dashboard

### Open `index.html`:
1. Find line ~2501 (search for `SCRIPT_URL`)
2. You should see:
   ```javascript
   const CONFIG = {
     SCRIPT_URL: 'https://script.google.com/macros/s/...',
   ```

### Replace the URL:
1. **Delete** the old URL
2. **Paste** your Web App URL from Step 2
3. Make sure it's between quotes: `'https://...'`
4. **Save the file**

### Example:
```javascript
const CONFIG = {
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyXXXXX/exec',
  USE_GOOGLE_SHEETS: true,
  SYNC_SCHEDULES_TO_SHEETS: true,
  SYNC_LEAVES_TO_SHEETS: true,
  SYNC_TIME_TRACKING_TO_SHEETS: true,
  USE_FALLBACK_CREDENTIALS: true
};
```

### Refresh Your Dashboard:
1. Open the dashboard in your browser
2. Press **Ctrl+Shift+R** (hard refresh)
3. Log in
4. You should see: **"✅ Loaded X staff members"**

---

## 🚨 COMMON ISSUES

### Issue: "You do not have permission to call SpreadsheetApp"

**Fix:**
1. Go to Google Apps Script
2. Run the `testSheetAccess` function
3. Click "Review permissions"
4. Authorize the script

### Issue: "Requested entity was not found"

**Fix:**
One of your sheet IDs is wrong.

**Check:**
1. Open your Google Apps Script
2. Find the `SHEET_IDS` section at the top
3. Try opening each sheet URL:
   - Staff: https://docs.google.com/spreadsheets/d/15BXIEtJViCna0zQdrrPXHXqN2bkddPNNEFGcS33PUK0/edit
   - Leaves: https://docs.google.com/spreadsheets/d/1z1OZRPXqbVMBBZg4UacWK9a1H_KSdC7_srHbLZ0vKp0/edit
   - Schedule: https://docs.google.com/spreadsheets/d/19Vc3_ntR6C1MadhbpjPZmWenOKbVrH_heqE_2Nxstd8/edit
   - Time Tracking: https://docs.google.com/spreadsheets/d/1RTHfdCg0FvpbHKbbEz2pb1FJUoVZvKkRqqbuSb8VboY/edit

**If any link doesn't work:**
1. Find the correct sheet in your Google Drive
2. Copy the ID from the URL
3. Update `SHEET_IDS` in the script
4. Save and redeploy

### Issue: Dashboard shows "Failed to fetch data"

**Check browser console (F12):**
1. Press F12 in your browser
2. Click "Console" tab
3. Look for error messages

**Most likely cause:**
- Wrong `SCRIPT_URL` in index.html
- Script not deployed

**Fix:**
- Double-check Step 2 and Step 3 above

### Issue: Web App URL shows an error when I open it

**Error: "Script has been disabled for the user"**
- Your script isn't deployed. Go to Step 2.

**Error: "Authorization required"**
- Run `testSheetAccess` function to authorize

**Error: Blank page or "Invalid action"**
- Old code is deployed. Update the script code and redeploy.

---

## 🔍 Verify Everything is Working

### In Google Apps Script:
1. Run `testSheetAccess` function
2. Should see ✅ for all 4 sheets
3. Check "Executions" log - should show "Completed" status

### In Your Browser:
1. Open the Web App URL directly
2. Should see JSON data with your staff list
3. Should look like:
   ```json
   {
     "status": "success",
     "data": [["Name","TRN","Department",...], ...]
   }
   ```

### In Your Dashboard:
1. Open index.html in browser
2. Log in (aabyfield / Byfield85)
3. Should see: "🔥 Fetching latest data..."
4. Then: "✅ Loaded X staff members"
5. Staff Monitor shows your staff list
6. Scheduling dropdown has staff names

---

## 📝 Checklist

Run through this:

- [ ] Opened Google Apps Script
- [ ] Ran `testSheetAccess` function successfully
- [ ] Authorized the script (if prompted)
- [ ] All 4 sheets show ✅ in the log
- [ ] Deployed as Web App
- [ ] "Who has access" is set to "Anyone"
- [ ] Copied the Web App URL
- [ ] Web App URL works when opened in browser (shows JSON data)
- [ ] Updated `CONFIG.SCRIPT_URL` in index.html
- [ ] Saved index.html
- [ ] Refreshed dashboard
- [ ] Can log in successfully
- [ ] Sees "✅ Loaded X staff members" message

---

## ✅ IT SHOULD WORK NOW!

If you followed all 3 steps and still have issues, check:
1. **Browser Console** (F12) - what's the exact error?
2. **Google Apps Script Executions** - any failed executions?
3. **TROUBLESHOOTING.md** - detailed guide for specific errors

---

## 🆘 Tell Me the Error

If it's still not working, I need to know:

1. **What error message do you see?** (exact text)
2. **Where do you see it?** (dashboard, console, script editor)
3. **What did `testSheetAccess()` show?** (copy the log)
4. **Does the Web App URL work?** (what happens when you open it)

With this info, I can tell you exactly what's wrong!
