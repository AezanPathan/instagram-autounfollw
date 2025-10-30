![Instagram Auto-Unfollow Demo](./assets/bluetonedievories.gif)

# 🚀 Instagram Auto-Unfollow

A minimal Instagram unfollow automation built with Node.js, Puppeteer (via Crawlee), and a simple configuration-first design. Credentials live in a .env file and all page selectors are centralized in a JSON file so you can tweak them without changing code.


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
#   INSTAGRAM_USERNAME=your_username  # Your Instagram username
#   INSTAGRAM_PASSWORD=your_password  # Your Instagram password
# Optional tuning
#   MAX_UNFOLLOW_COUNT=100   # Limit how many to unfollow per run 
#   UNFOLLOW_DELAY=5000  # Delay between unfollows in ms (default 5000)
#   SCROLL_DELAY=3000  # Delay after scrolling in ms (default 3000)

# Run
npm start
```

## 📝 Notes

- This tool automates actions on Instagram UI.It intentionally operates at a human-like pace to reduce the risk of Instagram detecting or blocking automated behavior.

- If login fails, delete the cookies.json file and try again — this resets your session.

- Run with headful browser by default; you can set headless if you prefer inside `src/main.js` launch options.

---

## 💖 Support

If this saved you time, you can support here:

<p><a href="https://www.buymeacoffee.com/aezan"> <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="Buy Me A Coffee" /></a></p>
