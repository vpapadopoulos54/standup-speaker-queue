# 🎤 Standup Speaker Queue

A simple, modern web app to manage your daily standup speaking order. Perfect for distributed teams!

## Features

✨ **Core Features:**
- 📋 **Input your team list** - Add team members with optional project tags
- 🎲 **Shuffle button** - Randomize the speaking order
- 🎤 **Next button** - Highlight the current speaker
- 📊 **Queue tracking** - Always shows who already spoke and who's left
- 💾 **Local storage** - Team list persists day to day in browser storage
- 🏷️ **Tags & filtering** - Group by project name or any custom tag
- 🚀 **No backend required** - Pure frontend, deployable anywhere

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## How to Use

1. **Add Team Members**: Enter a name and optional project tag, click "Add Member"
2. **Shuffle Order**: Click the "🎲 Shuffle Order" button to randomize who speaks first
3. **Start Queue**: Click "Next Speaker" to highlight the current speaker
4. **Mark as Done**: Click "✓ Done Speaking" when they finish
5. **Filter by Tag**: Use the tag filter to see only team members from a specific project
6. **Reset Queue**: Click "↩️ Reset Queue" to start over without clearing team members
7. **Clear All**: Remove all team members (with confirmation)

## Deployment

### GitHub Pages

This app is configured for easy deployment to GitHub Pages:

1. Push to your GitHub repository
2. The GitHub Actions workflow will automatically build and deploy to `https://yourusername.github.io/standup-speaker-queue/`
3. No additional configuration needed!

### Other Platforms

Since this is a static site, you can deploy the `dist/` folder to:
- Vercel
- Netlify
- Firebase Hosting
- Any static hosting service

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Local Storage** - Data persistence

## Architecture

The app uses a simple state-based architecture:
- `members` - All team members with their tags
- `queue` - Order of speakers
- `spoken` - Members who have already spoken
- `currentSpeaker` - Currently highlighted speaker
- `selectedTag` - Active filter

Data is automatically saved to browser localStorage and restored on page refresh.

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## License

MIT

## Contributing

Feel free to fork and submit pull requests!
