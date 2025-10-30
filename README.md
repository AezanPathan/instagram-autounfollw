![Instagram Auto-Unfollow Demo](./assets/demo.gif)

# 🚀 Instagram Auto-Unfollow

A minimal Instagram unfollow automation built with Node.js, Puppeteer (via Crawlee), and a simple configuration-first design. Credentials live in a .env file and all page selectors are centralized in a JSON file so you can tweak them without changing code.

---

## ⚙️ Features

- 🔐 Credentials from .env (no hardcoding)
- 🧩 All CSS selectors in `src/config/selectors.json`
- 🍪 Cookie persistence to skip repeated logins
- ⏱️ Configurable unfollow count and delays via env
- 🧭 Clear logs for each automation step

---

## 🧰 Tech Stack

- Node.js + npm
- Crawlee (Puppeteer under the hood)

---

## 📦 Getting Started

```powershell
# Clone your fork
git clone https://github.com/AezanPathan/instagram-autounfollw.git
cd instagram-autounfollw

# Install dependencies
npm install

# Create your .env from the example
Copy-Item .env.example .env

# Edit .env and set credentials
#   INSTAGRAM_USERNAME=your_username
#   INSTAGRAM_PASSWORD=your_password
# Optional tuning
#   MAX_UNFOLLOW_COUNT=100
#   UNFOLLOW_DELAY=5000
#   SCROLL_DELAY=3000

# Run
npm start
```

---

## 🔧 Configuration

- Environment variables: `.env`
	- `INSTAGRAM_USERNAME` – Your Instagram username
	- `INSTAGRAM_PASSWORD` – Your Instagram password
	- `MAX_UNFOLLOW_COUNT` – Limit how many to unfollow per run (default 100)
	- `UNFOLLOW_DELAY` – Delay between unfollows in ms (default 5000)
	- `SCROLL_DELAY` – Delay after scrolling in ms (default 3000)

- Selectors: `src/config/selectors.json`
	- Centralizes all DOM selectors (login inputs, following dialog, confirm button, etc.).
	- If Instagram changes their HTML, update them here without touching code.

---

## 📁 Project Structure

```
instagram-autounfollw/
├─ assets/
│  └─ demo.gif                 # Place your GIF here (update README path if you rename it)
├─ src/
│  ├─ config/
│  │  └─ selectors.json        # All page selectors
│  └─ main.js                  # Entry point
├─ .env.example                # Copy to .env and fill in credentials
├─ package.json                # npm scripts and deps
└─ README.md                   # You are here
```

---

## 📝 Notes

- This tool automates actions on Instagram UI. Use responsibly and at your own risk. Instagram may throttle, block, or change selectors at any time.
- If login fails, delete `cookies.json` and try again.
- Run with headful browser by default; you can set headless if you prefer inside `src/main.js` launch options.

---

## 💖 Support

If this saved you time, you can support here:

<p><a href="https://www.buymeacoffee.com/aezan"> <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="Buy Me A Coffee" /></a></p>