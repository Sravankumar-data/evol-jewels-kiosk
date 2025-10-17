# 💎 Evol Jewels AR Kiosk - Challenge

An interactive AR jewelry try-on kiosk experience built with React, optimized for 55-inch vertical touchscreens (1440x2560px).

![Version](https://img.shields.io/badge/version-1.0.0-purple)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📸 **Live Camera Integration** - Real-time photo capture with webcam
- 🎨 **Interactive Style Survey** - "This or That" preference detection
- ⭐ **Celebrity Style Matching** - Personalized style recommendations
- 💍 **Virtual Try-On Studio** - AR overlay with live camera feed
- 🎛️ **3D Configurator** - Customize metals, stones, and sizes with live price updates
- 👗 **Wardrobe Upload** - Match jewelry with customer outfits via QR code
- 🛒 **Smart Checkout** - Seamless cart and order management
- 📊 **B2B Analytics Dashboard** - Real-time insights and trends
- 📱 **QR Code Integration** - Save and share selections to mobile devices

## 🚀 Live Demo

**[View Live Demo](https://evol-jewels-kiosk-6n3xday9j-sravans-projects-2c9d2f7f.vercel.app/)** 

## 🛠️ Tech Stack

- **Frontend:** React 18.2.0
- **Styling:** Tailwind CSS 3.3.0
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Camera API:** WebRTC getUserMedia

## 📋 Prerequisites

- Node.js 16+ and npm
- Modern web browser (Chrome recommended)
- Webcam/camera for AR features
- Internet connection

## 🏃‍♂️ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/evol-jewels-kiosk.git
cd evol-jewels-kiosk
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm start
```

Opens at `http://localhost:3000`

### 4. Build for production
```bash
npm run build
```

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 📁 Project Structure
```
evol-jewels-kiosk/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main React component (all screens)
│   ├── index.js            # React entry point
│   └── index.css           # Tailwind CSS imports
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
└── README.md              # This file
```

## 🎯 User Flow
```
Welcome Screen
    ↓
Photo Capture (Camera)
    ↓
Style Survey (3 Questions)
    ↓
Celebrity Style Match
    ↓
Jewelry Feed (Browse Products)
    ↓
Virtual Try-On (AR Preview)
    ↓
Configurator (Customize)
    ↓
Checkout (QR Code & Purchase)
    ↓
B2B Dashboard (Analytics)
```

## 🎨 Customization

### Update Jewelry Data

Edit the `jewelry` array in `src/App.js`:
```javascript
const jewelry = [
  { 
    id: 1, 
    name: 'Your Product',
    price: 50000,
    category: 'Ring',
    tags: ['Gold', 'Diamond'],
    img: 'https://your-image-url.jpg'
  },
  // Add more items...
];
```

### Change Brand Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#7c3aed',  // Purple
      secondary: '#ec4899', // Pink
    }
  }
}
```

### Connect to Backend API

Add API calls in `src/App.js`:
```javascript
const fetchJewelry = async () => {
  const response = await fetch('https://your-api.com/jewelry');
  const data = await response.json();
  setJewelry(data);
};
```

## 🖥️ Kiosk Hardware Setup

### Recommended Hardware

- **Display:** 55" vertical touchscreen (1440x2560)
- **Computer:** Mini PC / Raspberry Pi 4/5 (4GB+ RAM)
- **Camera:** 1080p webcam (if not built-in)
- **Storage:** 32GB+ SSD
- **Network:** Ethernet connection

### Kiosk Mode (Windows)

Create `start-kiosk.bat`:
```batch
@echo off
"C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-pinch https://your-url.vercel.app
```

### Kiosk Mode (Linux/Raspberry Pi)

Create `start-kiosk.sh`:
```bash
#!/bin/bash
chromium-browser --kiosk --disable-pinch https://your-url.vercel.app
```

## 🔒 Camera Permissions

The app requires camera access for photo capture and AR try-on features:

- **HTTPS is required** (camera API security requirement)
- Users will be prompted to allow camera access
- Vercel and Netlify provide HTTPS automatically

## 🐛 Troubleshooting

### Camera not working

- Ensure you're using HTTPS (not HTTP)
- Allow camera permissions when prompted
- Check if camera is being used by another app
- Try different browser (Chrome recommended)

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Images not loading

- Check image URLs are valid
- Verify CORS settings if using external CDN
- Check browser network tab for errors

## 📊 Performance

- **Load Time:** < 3 seconds
- **Lighthouse Score:** 90+
- **Mobile Responsive:** Yes
- **Browser Support:** Chrome, Firefox, Safari, Edge

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

MIT License - Free to use for commercial projects

## 👥 Authors

- **Banothu Sravan Kumar** - *Initial work* - (https://github.com/Sravankumar-data)
- **Hanuman Sai Vamshi**
- **Banlichak Suman**
- **Shaik Mohiuddin**
- 
## 🙏 Acknowledgments

- Built with React and Tailwind CSS
- Icons by Lucide React
- Stock images from Unsplash
- Inspired by modern retail experiences

## 📞 Contact

- **Website:** https://evol-jewels-kiosk-6n3xday9j-sravans-projects-2c9d2f7f.vercel.app/
- **GitHub:** [@Sravankumar-data](https://github.com/Sravankumar-data)

## 🗺️ Roadmap

- [ ] Real 3D models with Three.js
- [ ] Advanced face detection AR
- [ ] Social media sharing
- [ ] Email/SMS notifications
- [ ] Multi-language support
- [ ] Voice navigation
- [ ] AI-powered recommendations

---

**Made with 💎 by the Evol Jewels Team**

*Transform your jewelry retail experience with cutting-edge AR technology*
