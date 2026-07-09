# ☁️ Google Drive Sync — Setup Guide

The dashboard uses the **same Google Drive save/sync module as the May Pen Hospital Asset Dashboard** (`GDriveSync`): sign in with a Google account and the app writes data **straight to Drive** — no Apps Script, no Sheets.

- Everything (staff, leave records, schedule, time tracking, reminders, PMAS documents) is saved to **`CHIEF_ORDERLY_BACKUP.json`** in your Drive folder
- **Auto-sync**: after any change, the app downloads the cloud backup, merges it in (union, newest wins) and saves back to Drive on the next **2-minute** cycle — an idle dashboard makes zero Drive calls
- The cloud data is also pulled when you **sign in**, and pushed when you **log out** or press 💾 Save
- Manual **Save to Cloud** / **Sync from Cloud** buttons work exactly like the asset dashboard

## Out-of-the-box defaults

| Setting | Default |
|---|---|
| Client ID | `438550085155-…qidfuo4.apps.googleusercontent.com` (Asset Dashboard project — same Google sign-in) |
| Drive Folder | [Chief Orderly Dashboard folder](https://drive.google.com/drive/folders/1s8t6WQgnYUqOuhOOaz3Kz3JT8BJa-iGT) (`1s8t6WQgnYUqOuhOOaz3Kz3JT8BJa-iGT`) |
| Backup file | `CHIEF_ORDERLY_BACKUP.json` |

> The connected Google account must be able to **edit** that folder (own it, or have it shared with Editor rights) — otherwise the first upload fails with a 404/403.

So if you host this dashboard on the **same web address** as the asset dashboard (same authorized origin), you can just open **Google Drive Sync** in the sidebar and click **🔑 Connect Google Drive** — pick the Google account you want the app to use, approve, done. The pill in the top bar turns green: **☁️ Connected**.

## Using a different account / your own project

To connect **a new Google account**, just pick it in the account chooser when you click Connect — the backup is written to *that* account's Drive (the folder ID must be a folder that account can write to; set your own Folder ID in Settings).

To use your **own Google Cloud project** instead of the asset dashboard's:

1. https://console.cloud.google.com → New Project
2. **APIs & Services → Library** → enable **Google Drive API**
3. **OAuth consent screen** → External → add your Google account(s) under **Test users**
4. **Credentials → Create Credentials → OAuth client ID** → Web application → add your dashboard's address under **Authorized JavaScript origins** (e.g. `https://YOUR-USERNAME.github.io`)
5. Copy the Client ID into **Google Drive Sync → Settings → Client ID**, set your **Folder ID** (from the folder's URL in Drive), **Save Settings**, then **Connect**

> ⚠️ The page must be served over **http(s)** (GitHub Pages or any web host). Google sign-in does not work from a `file://` page.

## Cross-account read (optional)

`drive.file` scope only lets an account see files it created with this app, so a *different* signed-in account can't read the main account's backup. To let any user sync FROM the main backup (same trick as the asset dashboard):

1. In Drive, share `CHIEF_ORDERLY_BACKUP.json` → **Anyone with the link → Viewer**
2. Create a **Drive API key** in the same Cloud project, restrict it to the Drive API + your site
3. Paste the **API Key** and the backup's **File ID** into Settings

The owner keeps writing via OAuth; everyone else reads publicly.

## Manual token fallback

If the Google popup is blocked, paste an OAuth access token into the **Manual token** field (e.g. from [OAuth 2.0 Playground](https://developers.google.com/oauthplayground) with the `drive.file` scope) and click **Connect with Token**.

## Troubleshooting

- **"Access blocked" / 403 access_denied** — add the account as a **Test user** on the OAuth consent screen, or publish the consent screen
- **"origin mismatch"** — the browser address must exactly match an Authorized JavaScript origin on the Client ID
- **Session expired** — Google tokens last ~1 hour; reconnect with the Connect button when prompted
- **Upload fails with 404** — the connected account can't write to the configured Folder ID; set a folder that account owns (or that's shared to it with edit rights)
