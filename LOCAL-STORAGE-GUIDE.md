# 💾 Local Storage Mode - User Guide

## ✅ **You're Now Using Local Storage!**

Your Chief Orderly Dashboard is now configured to save all data locally in your browser, with the ability to export/import data files to any folder you choose.

---

## 🎯 **How It Works**

### **Automatic Saving**
- All data is automatically saved to your browser's localStorage
- Changes are instant - no need to click "Save"
- Data persists when you close and reopen the dashboard
- Works completely offline - no internet required!

### **Manual Backup & Restore**
- Export your data as JSON files anytime
- Save the files to any folder on your computer
- Import the files on any device or browser
- Perfect for backups and data portability

---

## 📥 **How to Export Data**

### **Step 1: Go to Reports & Tools**
1. Open the dashboard
2. Click on **"Reports & Tools"** in the navigation menu

### **Step 2: Choose What to Export**

#### **Option A: Export Everything (Recommended)**
Click **"Export All Data"** button
- Downloads: `chief-orderly-backup-YYYY-MM-DD.json`
- Includes: Staff, Leaves, Schedule, Time Tracking
- Best for complete backups

#### **Option B: Export Individual Sections**
Click specific export buttons:
- **Export Staff Data** - Staff members only
- **Export Leave Records** - Leave requests only
- **Export Schedule Data** - Scheduling only
- **Export Time Tracking** - Time tracking only

### **Step 3: Save the File**
1. Your browser will download a `.json` file
2. The file goes to your Downloads folder by default
3. Move it to your designated backup folder
4. Keep multiple backups with different dates

---

## 📤 **How to Import Data**

### **Step 1: Go to Reports & Tools**
1. Open the dashboard
2. Click on **"Reports & Tools"**

### **Step 2: Click "Import All Data"**
1. Click the **"Import All Data"** button
2. A file picker will open

### **Step 3: Select Your Backup File**
1. Browse to your backup folder
2. Select the `.json` file you want to restore
3. Click "Open"

### **Step 4: Confirm**
- The dashboard will load all data immediately
- You'll see a success message showing what was imported
- All views will refresh with the imported data

---

## 📁 **Recommended Backup Strategy**

### **Daily Backups**
```
My Documents/
  └── Chief Orderly Backups/
      ├── Dailybackup/
      │   ├── chief-orderly-backup-2025-01-20.json
      │   ├── chief-orderly-backup-2025-01-21.json
      │   └── chief-orderly-backup-2025-01-22.json
      ├── Weekly/
      │   ├── chief-orderly-backup-2025-01-15.json
      │   └── chief-orderly-backup-2025-01-22.json
      └── Monthly/
          └── chief-orderly-backup-2025-01-01.json
```

### **Suggested Schedule**
- **End of each day:** Export all data
- **End of each week:** Move to "Weekly" folder
- **End of each month:** Keep one copy in "Monthly" folder
- **Keep at least 3 months of backups**

---

## 🔄 **Sharing Data Between Computers**

### **Scenario: Use on multiple computers**

**On Computer A:**
1. Export All Data
2. Save to USB drive or cloud folder (Dropbox, Google Drive, etc.)

**On Computer B:**
1. Copy the file from USB/cloud
2. Open dashboard
3. Import All Data
4. Select the copied file

**Result:** Both computers now have the same data!

---

## 💡 **Tips & Best Practices**

### **✅ Do This:**
- Export data at the end of each work day
- Store backups in multiple locations (computer + cloud)
- Use descriptive folder names
- Keep at least 3 recent backups
- Test importing occasionally to verify backups work

### **❌ Avoid This:**
- Don't delete old backups immediately
- Don't rely on a single backup copy
- Don't edit the JSON files manually (can corrupt data)
- Don't forget to export before clearing browser data

---

## 🚨 **Important Information**

### **Where is Data Stored?**
- **Browser localStorage** - Automatically saved
- **Location:** Inside your browser's data folder
- **Capacity:** Usually 5-10 MB (enough for thousands of records)

### **When Data is Lost:**
Data will be lost if you:
- Clear browser cache/cookies/site data
- Uninstall the browser
- Use browser's "Clear all data" feature

**Solution:** Always keep exported backup files!

### **Browser-Specific Data**
- Each browser has separate data (Chrome ≠ Firefox)
- Incognito/Private mode doesn't save data
- Different user profiles have separate data

**Solution:** Export from one browser, import to another

---

## 📊 **Data File Format**

Your exported files look like this:

```json
{
  "exportDate": "2025-01-20T10:30:00.000Z",
  "version": "1.0",
  "staffData": [
    {
      "name": "John Doe",
      "trn": "12345",
      "department": "Nursing",
      ...
    }
  ],
  "leaveRecords": [...],
  "scheduleData": {...},
  "timeTrackingRecords": [...]
}
```

- **Human-readable** - Can open in any text editor
- **Portable** - Works on any device
- **Complete** - Contains all your data
- **Dated** - Filename includes export date

---

## 🔧 **Troubleshooting**

### **Problem: Data disappeared after closing browser**
**Cause:** Browser cleared localStorage or you're in incognito mode
**Fix:** Import your latest backup file

### **Problem: Can't import - "Invalid backup file" error**
**Cause:** File is corrupted or wrong format
**Fix:**
1. Make sure it's a `.json` file
2. Try a different backup file
3. Don't edit JSON files manually

### **Problem: Export button doesn't work**
**Cause:** Pop-up blocker or browser security
**Fix:**
1. Allow pop-ups for this site
2. Try a different browser
3. Check browser console (F12) for errors

### **Problem: Running out of localStorage space**
**Cause:** Too much data (rare, usually happens with 10,000+ records)
**Fix:**
1. Export and archive old data
2. Delete very old records you don't need
3. Use browser's storage management

---

## 🔄 **Switching Back to Google Sheets (Optional)**

If you want to use Google Sheets again:

1. Open `index.html`
2. Find this section (around line 2500):
```javascript
const CONFIG = {
    USE_GOOGLE_SHEETS: false,  // Change to true
    SYNC_SCHEDULES_TO_SHEETS: false,  // Change to true
    SYNC_LEAVES_TO_SHEETS: false,  // Change to true
    SYNC_TIME_TRACKING_TO_SHEETS: false,  // Change to true
    ...
}
```
3. Change all `false` to `true`
4. Save the file
5. Deploy the Google Apps Script
6. Update `SCRIPT_URL`

---

## ✅ **Quick Reference**

| Task | Steps |
|------|-------|
| **Backup all data** | Reports & Tools → Export All Data |
| **Restore data** | Reports & Tools → Import All Data → Select file |
| **Move to new computer** | Export → Copy file → Import on new computer |
| **Daily backup** | Export All Data → Save to backup folder |
| **Check localStorage** | F12 → Application → Local Storage |

---

## 🎉 **Benefits of Local Storage**

✅ **No Google Account needed** - Works offline completely
✅ **No setup required** - Just open and use
✅ **Fast performance** - Instant save and load
✅ **Full control** - You own your data files
✅ **Portable** - Easy to move between devices
✅ **Simple backups** - Just copy JSON files
✅ **No sync issues** - No conflicts or connection errors

---

## 📞 **Need Help?**

- **Lost data?** → Import your most recent backup
- **Can't export?** → Check browser console (F12) for errors
- **File won't import?** → Make sure it's a valid `.json` file from an export
- **Want Google Sheets?** → See "Switching Back to Google Sheets" section above

---

**Remember:** Export your data regularly! It's your safety net! 💾✨
