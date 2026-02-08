# ❓ FAQ - Frequently Asked Questions

## Questions About the Commands

### Q: "Where do I insert that code?"

**A:** You don't insert it anywhere! Those are **commands** you type into Terminal (Mac/Linux) or Command Prompt (Windows).

Think of it this way:
- ❌ NOT like HTML code you put in `index.html`
- ✅ Like typing instructions to your computer

**See:** [VISUAL-GUIDE.md](VISUAL-GUIDE.md) for pictures showing where to type.

---

### Q: "What is Terminal/Command Prompt?"

**A:** It's a program on your computer where you type text commands.

**How to open it:**
- **Windows:** Press Windows key, type `cmd`, press Enter
- **Mac:** Press Cmd+Space, type `terminal`, press Enter
- **Linux:** Press Ctrl+Alt+T

**See:** [BEGINNERS-GUIDE.md](BEGINNERS-GUIDE.md) Section "Step 1" for detailed instructions.

---

### Q: "What does 'Merge PR to main branch' mean?"

**A:** This is GitHub terminology. In simple terms:

- Your website files are ready but in a "test area" (called a branch)
- To make them the "official version", you need to merge them
- This is done by clicking a green button on GitHub's website

**In plain English:** "Click the green button to publish your changes"

**See:** [BEGINNERS-GUIDE.md](BEGINNERS-GUIDE.md) Section "Option 2" for step-by-step instructions.

---

## Questions About Running the Website

### Q: "Do I need to keep Terminal/Command Prompt open?"

**A:** Yes! While you want to view the website.

- The Terminal window runs the server
- Close it = website stops working
- It's normal - just reopen and run the commands again when needed

---

### Q: "Can I edit the website files?"

**A:** Yes! Edit the files, then:
1. Refresh your browser (press F5)
2. Your changes will appear

You don't need to restart the server for HTML/CSS/JS changes.

---

### Q: "What if port 8000 is already in use?"

**A:** Use a different port number:

```bash
python3 -m http.server 9000
```

Then visit: `localhost:9000` in your browser

---

### Q: "The website shows but no images appear"

**A:** This is normal in some environments. The images are loaded from external sources (Unsplash) which might be blocked.

The website structure and functionality still work perfectly!

---

## Questions About GitHub Pages

### Q: "What is GitHub Pages?"

**A:** It's free website hosting from GitHub. Your website gets a public URL that anyone can visit.

Example: `https://dodocuccaro.github.io/homesearch/`

---

### Q: "Do I need GitHub Pages to view my website?"

**A:** No! You can view it locally on your computer using Option 1 (Terminal/Command Prompt).

GitHub Pages is only needed if you want:
- A public URL anyone can visit
- To share your website with others on the internet

---

### Q: "How long does GitHub Pages take to activate?"

**A:** Usually 1-3 minutes after you enable it in Settings.

---

## Questions About Python

### Q: "I don't have Python installed. What do I do?"

**A:** You have 3 options:

**Option 1: Install Python**
- Download from: https://www.python.org/downloads/
- Run the installer
- Make sure to check "Add Python to PATH"

**Option 2: Use Node.js** (if you have it)
```bash
npx http-server -p 8000
```

**Option 3: Just open the file**
- Double-click `index.html`
- Some features might not work perfectly

---

### Q: "I get 'python3: command not found'"

**A:** Try typing `python` instead of `python3`:

```bash
python -m http.server 8000
```

Still not working? You need to install Python (see above).

---

## Questions About the Website

### Q: "Can I change the website design/content?"

**A:** Yes! All files are yours to modify:

- `index.html` - Home page content
- `results.html` - Results page content
- `css/style.css` - All styling/colors
- `js/search.js` - Search functionality
- `js/results.js` - Results display and property data

---

### Q: "Can I add more properties?"

**A:** Yes! Edit `js/results.js` and add more objects to the `properties` array.

---

### Q: "Is this a real booking website?"

**A:** No, it's a demonstration/template. The properties are mock data.

To make it real, you'd need to:
- Connect to a real property database
- Add payment processing
- Implement actual booking functionality

---

## Questions About Files

### Q: "Which file do I open to view the website?"

**A:** If using Terminal/Command Prompt:
- You don't open any file
- Just visit `localhost:8000` in your browser

If opening directly:
- Double-click `index.html`

---

### Q: "What are all these .md files?"

**A:** They're documentation files (like instruction manuals):

- `README.md` - Project overview
- `BEGINNERS-GUIDE.md` - Step-by-step guide for first-timers
- `HOW-TO-VIEW.md` - Complete viewing instructions
- `QUICK-START.md` - Quick reference for experienced users
- `VISUAL-GUIDE.md` - Diagrams and pictures
- `VIEWING.md` - Technical details
- `FAQ.md` - This file!

You can ignore them - they're just help documents.

---

## Still Have Questions?

1. **Read the guides:**
   - 🔰 [BEGINNERS-GUIDE.md](BEGINNERS-GUIDE.md) - Start here!
   - 🎨 [VISUAL-GUIDE.md](VISUAL-GUIDE.md) - Pictures and diagrams
   - 📖 [HOW-TO-VIEW.md](HOW-TO-VIEW.md) - Detailed instructions

2. **Common issues:**
   - Command not found → Install Python
   - Port in use → Use different port (9000)
   - Terminal closed → Just reopen and run commands again

3. **Remember:**
   - Commands go in Terminal/Command Prompt
   - Keep Terminal open while viewing website
   - localhost:8000 is your local website address

---

**You've got this! 💪 Try Option 1 (Local Server) first - it's the easiest!**
