# Chrome Extension Setup Guide

## Building the Extension

```bash
npm run build:extension
```

This will create a `dist` folder with all the extension files.

## Installing Locally in Chrome

1. **Open Chrome Extensions Page:**
   - Go to `chrome://extensions/` or click the menu (⋮) → More Tools → Extensions

2. **Enable Developer Mode:**
   - Toggle "Developer mode" in the top right corner

3. **Load Unpacked Extension:**
   - Click "Load unpacked"
   - Navigate to this project's `dist` folder (created after running `npm run build:extension`)
   - Select and open the `dist` folder

4. **Done!**
   - The Standup Queue extension should now appear in your Chrome extensions
   - Click the icon to open the popup

## How It Works

- **Popup Size:** 500px width × 600px height
- **Data Storage:** All data is stored locally in browser storage (never synced)
- **State Persistence:** Your team list, speakers, and queue state are preserved between sessions

## Using the Extension

1. Click the Standup Queue icon in your Chrome toolbar
2. Add your team members
3. Use the Random Picker or Next button to select speakers
4. Mark speakers as done to advance through the queue

## Updating the Extension

After making changes to the code:

1. Run `npm run build:extension`
2. Go to `chrome://extensions/`
3. Find "Standup Queue" and click the refresh icon (or press F5)
4. The extension will reload with your changes

## Troubleshooting

**Extension not loading?**
- Make sure Developer mode is enabled
- Check that you're pointing to the correct `dist` folder
- Try refreshing the extension

**Data not persisting?**
- Clear Chrome site data and try again
- Check browser console (right-click extension → Inspect popup) for errors

**Extension icon not showing?**
- The extension is installed, but might be hidden. Click the puzzle piece icon in the Chrome toolbar and pin the extension
