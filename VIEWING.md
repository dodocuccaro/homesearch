# 👀 How to View Your HomeSearch Website

There are **3 ways** to view your website. Choose the one that works best for you:

---

## 🚀 Option 1: View Locally Right Now (Fastest)

You can view the website immediately on your computer:

### Method A: Direct File Opening
1. Navigate to your repository folder: `/home/runner/work/homesearch/homesearch`
2. Double-click on `index.html` to open it in your default web browser
3. That's it! 🎉

### Method B: Using a Local Server (Recommended)
A local server provides the best experience:

```bash
# Navigate to your project folder
cd /home/runner/work/homesearch/homesearch

# Start a simple HTTP server using Python 3
python3 -m http.server 8000

# Or if you have Python 2:
python -m SimpleHTTPServer 8000

# Or if you have Node.js installed:
npx http-server -p 8000
```

Then open your browser and go to:
```
http://localhost:8000
```

Press `Ctrl+C` in the terminal when you want to stop the server.

---

## 🌐 Option 2: Deploy to GitHub Pages (Public URL)

To make your website accessible to everyone on the internet:

### Step 1: Merge Your Changes
First, you need to merge this pull request into your `main` branch:
1. Go to: https://github.com/dodocuccaro/homesearch/pulls
2. Find and open this pull request
3. Click the green **"Merge pull request"** button
4. Confirm the merge

### Step 2: Enable GitHub Pages
1. Go to your repository: https://github.com/dodocuccaro/homesearch
2. Click on **Settings** (top menu)
3. Scroll down and click on **Pages** (left sidebar)
4. Under **"Source"**:
   - Select branch: **`main`**
   - Select folder: **`/ (root)`**
5. Click **Save**

### Step 3: Access Your Website
After 1-2 minutes, your website will be live at:
```
https://dodocuccaro.github.io/homesearch/
```

**Note:** GitHub will show you the exact URL in the Pages settings once it's published.

---

## 📱 Option 3: Preview on Mobile/Other Devices

### If Running Locally:
1. Start the local server (see Option 1, Method B above)
2. Find your computer's IP address:
   ```bash
   # On Linux/Mac:
   hostname -I
   
   # On Windows:
   ipconfig
   ```
3. On your mobile device (must be on same WiFi):
   - Open browser
   - Go to: `http://YOUR_IP_ADDRESS:8000`
   - Example: `http://192.168.1.100:8000`

### If Deployed to GitHub Pages:
Simply visit the public URL from any device:
```
https://dodocuccaro.github.io/homesearch/
```

---

## 🔍 What You'll See

### Home Page (`index.html`)
- Beautiful hero section with search form
- Search fields: Where, Check-in, Check-out, Guests
- "Why Choose HomeSearch?" features section
- Professional footer

### Results Page (`results.html`)
- 15 holiday properties automatically sorted by price
- Property cards with images, ratings, and details
- Price range: €35 - €320 per night
- Fully responsive design

---

## 🐛 Troubleshooting

### Website doesn't load locally?
- **Make sure you're in the correct directory** with the HTML files
- Try a different browser (Chrome, Firefox, Safari, Edge)
- Check if port 8000 is already in use - try a different port like 8080

### GitHub Pages not working?
- Wait 2-3 minutes after enabling - GitHub needs time to build
- Make sure you merged to the `main` branch
- Check that GitHub Pages is enabled in Settings → Pages
- Visit the GitHub Pages URL shown in your repository settings

### Images not showing?
- This is normal when viewing the HTML file directly
- External images (from Unsplash) will load when using a server or GitHub Pages
- The layout and functionality will still work perfectly

---

## 📞 Need More Help?

- **Documentation**: See [README.md](README.md) for full project documentation
- **GitHub Pages Guide**: https://docs.github.com/en/pages/getting-started-with-github-pages
- **Repository**: https://github.com/dodocuccaro/homesearch

---

**Happy browsing! 🌍✈️**
