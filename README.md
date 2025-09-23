# Zomodoro - Complete Pomodoro Timer Web App

A feature-rich, mobile-friendly Pomodoro Timer application built with HTML, CSS, and JavaScript. Designed for maximum productivity with a clean, modern interface and comprehensive functionality.

## 🍅 Features

### Timer Functionality

- **Default 25-minute focus sessions** with customizable durations
- **Automatic session management**: Short breaks (5 min) and long breaks (15-20 min after 4 Pomodoros)
- **Complete timer controls**: Start, Pause, Reset buttons
- **Auto-switch capability** between work and break sessions
- **Visual progress indicator** with animated circular countdown
- **Accurate timing** even when tab is inactive

### Customizable Settings

- **Adjustable durations** for focus, short break, and long break sessions
- **Configurable long break interval** (after how many focus sessions)
- **Auto-start options** for breaks and focus sessions
- **Sound notification controls**
- **Settings persistence** via localStorage

### Task Management

- **Add, edit, and delete tasks** with intuitive interface
- **Assign Pomodoro estimates** to each task (1-20 Pomodoros)
- **Track task progress** with completed/required Pomodoro counts
- **Visual task completion** with checkboxes and progress indicators
- **Automatic Pomodoro assignment** to active tasks

### Notifications & Alerts

- **Desktop notifications** when sessions end (with permission)
- **In-app notifications** with custom styling
- **Audio alerts** with different sounds for different events
- **Customizable notification preferences**

### Statistics & Analytics

- **Daily Pomodoro tracking**
- **Weekly progress monitoring**
- **Total lifetime Pomodoros**
- **Streak system** to maintain consistency
- **Achievement system** with 6 different achievements

### UI/UX Excellence

- **Responsive design** optimized for mobile, tablet, and desktop
- **Light/Dark mode toggle** with system preference detection
- **Modern, minimal design** with smooth animations
- **Accessibility features** including keyboard shortcuts
- **Performance optimized** for mobile devices

### Data Persistence

- **localStorage integration** for all user data
- **Settings preservation** across browser sessions
- **Task and statistics backup**
- **Achievement progress tracking**

## 🚀 Getting Started

### Option 1: Local Development Server

1. Clone or download the project files
2. Navigate to the project directory
3. Start a local server:

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (if you have http-server installed)
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

4. Open `http://localhost:8000` in your browser

### Option 2: Direct File Access

1. Download all files (`index.html`, `styles.css`, `script.js`)
2. Double-click `index.html` to open in your browser
3. Grant notification permissions when prompted for best experience

## 📱 Mobile Optimization

The app is fully responsive and optimized for mobile devices:

- **Touch-friendly interface** with appropriate button sizes
- **Responsive typography** that scales properly
- **Mobile-first CSS** with progressive enhancement
- **Optimized animations** for smooth performance
- **Reduced motion support** for accessibility

## ⌨️ Keyboard Shortcuts

- **Spacebar**: Start/Pause timer
- **R**: Reset timer
- **S**: Open settings
- **Escape**: Close modals

## 🏆 Achievement System

Unlock achievements by reaching milestones:

- 🍅 **Getting Started**: Complete your first Pomodoro
- ⚔️ **Daily Warrior**: Complete 5 Pomodoros in one day
- 🏆 **Week Champion**: Complete 25 Pomodoros in one week
- 🔥 **Streak Master**: Maintain a 7-day streak
- 💯 **Centurion**: Complete 100 total Pomodoros
- ✅ **Task Master**: Complete 10 tasks

## 🎨 Customization

### Themes

Toggle between light and dark themes using the theme button in the header. The app remembers your preference.

### Settings

Customize all timer durations and behavior:

- Focus duration (1-60 minutes)
- Short break duration (1-30 minutes)
- Long break duration (1-60 minutes)
- Long break interval (2-10 sessions)
- Auto-start preferences
- Sound preferences

## 📊 Statistics

Track your productivity with comprehensive statistics:

- **Today's Pomodoros**: Current day progress
- **This Week**: Weekly Pomodoro count
- **Total**: Lifetime achievement counter
- **Current Streak**: Consecutive days with activity

## 🔧 Technical Details

### Browser Compatibility

- **Modern browsers** (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- **Mobile browsers** (iOS Safari, Chrome Mobile, Samsung Internet)
- **Progressive Web App** features for enhanced mobile experience

### Performance Features

- **Efficient animations** using CSS transforms and opacity
- **Minimal JavaScript footprint** with no external dependencies
- **Optimized images** using SVG icons for crisp display
- **LocalStorage optimization** for fast data access

### Accessibility Features

- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Focus indicators** for better usability
- **Reduced motion** support for sensitive users
- **High contrast** compatible design

## 📁 File Structure

```
Zomodoro/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Complete JavaScript functionality
└── README.md           # This documentation
```

## 🔒 Privacy

- **No external dependencies** - works completely offline
- **No data collection** - all data stays in your browser
- **No server communication** - purely client-side application
- **Local storage only** - your data never leaves your device

## 🐛 Troubleshooting

### Notifications Not Working

1. Check browser notification permissions
2. Enable sound in settings if needed
3. Try refreshing the page and granting permissions again

### Timer Inaccuracy

1. Ensure JavaScript is enabled
2. Check if browser is throttling background tabs
3. Keep the tab active for most accurate timing

### Mobile Issues

1. Add the page to home screen for better performance
2. Ensure sufficient battery for uninterrupted sessions
3. Disable battery optimization for the browser if needed

## 🎯 Best Practices

1. **Set realistic Pomodoro estimates** for your tasks
2. **Take breaks seriously** - they're essential for productivity
3. **Track your progress** using the statistics feature
4. **Customize settings** to match your workflow
5. **Use the achievement system** for motivation

---

**Enjoy your productive Pomodoro sessions with Zomodoro! 🍅✨**
