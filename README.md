# 🌸 KADDU PROTOCOL

> A Secret Birthday Operation

A lovingly designed birthday treasure-hunt website built with React + Vite.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/Divyans-611/KadduPrototcol.git
cd KadduPrototcol

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

### Netlify

1. Push this repo to GitHub
2. Connect the repo on [netlify.com](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Vercel

1. Push this repo to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — just click Deploy

### GitHub Pages

1. Install gh-pages: `npm install -D gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## 💕 How It Works

The website is a 4-screen treasure hunt:

1. **Entry Screen** — A security check asking for the subject's name (`Kaddu`, case-insensitive)
2. **Access Granted** — A celebratory welcome screen with confetti & congratulations
3. **Morse Code** — A final credential encoded in Morse code (`-... .... .- .. -. ... / -.- .. / - .- .. -. -` -> `BHAINS KI TAINT`)
4. **Mission Complete** — The grand finale with instructions for opening the password-protected PDF

## 🛠️ Tech Stack

- React 18
- Vite 6
- Framer Motion
- Lucide React Icons
- Plain CSS (custom design system, no Tailwind)

---

*Made with love 💕*
