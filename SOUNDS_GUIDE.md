# Focus Sounds - Audio Files Guide

This file explains how to add your own audio files to the Zomodoro Focus Sounds feature.

## 📁 Folder Structure

Create the following folder structure in your Zomodoro directory:

```
Zomodoro/
├── sounds/
│   ├── nature/
│   │   ├── rain.mp3
│   │   ├── forest.mp3
│   │   ├── ocean.mp3
│   │   ├── birds.mp3
│   │   ├── thunder.mp3
│   │   ├── wind.mp3
│   │   ├── waterfall.mp3
│   │   └── crickets.mp3
│   ├── ambient/
│   │   ├── cafe.mp3
│   │   ├── fireplace.mp3
│   │   ├── library.mp3
│   │   ├── piano.mp3
│   │   ├── meditation.mp3
│   │   └── space.mp3
│   └── urban/
│       ├── train.mp3
│       ├── airplane.mp3
│       ├── fan.mp3
│       └── city.mp3
├── index.html
├── styles.css
├── script.js
└── README.md
```

## 🎵 Sound Categories

### 🌿 Nature Sounds (`sounds/nature/`)

- **rain.mp3** - Gentle rainfall sounds
- **forest.mp3** - Forest ambience with wind and leaves
- **ocean.mp3** - Ocean waves and beach sounds
- **birds.mp3** - Bird chirping and singing
- **thunder.mp3** - Distant thunder and storms
- **wind.mp3** - Wind through trees or open spaces
- **waterfall.mp3** - Flowing water and waterfalls
- **crickets.mp3** - Night crickets and insects

### 🏢 Ambient Sounds (`sounds/ambient/`)

- **cafe.mp3** - Coffee shop atmosphere with subtle chatter
- **fireplace.mp3** - Crackling fireplace sounds
- **library.mp3** - Quiet library ambience
- **piano.mp3** - Soft instrumental piano music
- **meditation.mp3** - Calm meditation soundscape
- **space.mp3** - Space ambience and cosmic sounds

### 🏙️ Urban & Transport (`sounds/urban/`)

- **train.mp3** - Train travel sounds
- **airplane.mp3** - Airplane cabin ambience
- **fan.mp3** - Electric fan white noise
- **city.mp3** - Distant city traffic and urban sounds

## 📋 Audio File Requirements

### File Format

- **Recommended**: MP3 format for best compatibility
- **Alternative**: WAV, OGG formats also supported
- **Bitrate**: 128-320 kbps (128 kbps recommended for mobile)

### Duration

- **Minimum**: 30 seconds (will loop automatically)
- **Recommended**: 2-10 minutes for seamless looping
- **Maximum**: No limit, but larger files take longer to load

### Audio Quality

- **Volume**: Normalize to consistent levels
- **Looping**: Ensure smooth loop points (no clicks/pops)
- **Frequency**: Focus on mid-range frequencies (100Hz-8kHz)
- **Compression**: Use consistent dynamic range

## 🔄 Fallback System

If an audio file is missing, the app will automatically:

1. Try to load the specified file
2. If file not found, fall back to procedurally generated sound
3. Display a console warning about the missing file
4. Continue working with generated alternatives

This means your app will work even if you don't have all audio files!

## 🎚️ Volume Optimization

### File Preparation Tips

- Normalize all files to similar peak levels
- Remove excessive silence at beginning/end
- Apply gentle compression for consistent loudness
- Test loop points to ensure seamless playback

### Mobile Considerations

- Keep files under 5MB each for faster loading
- Use compressed formats (MP3) for better performance
- Test on mobile devices for battery impact

## 🔧 Adding Custom Sounds

To add more sounds beyond the default categories:

1. **Add HTML** in `index.html`:

```html
<div class="sound-option" data-sound="your-sound-name">
  <div class="sound-icon">🎵</div>
  <span class="sound-name">Your Sound</span>
  <div class="sound-controls">
    <button class="sound-btn play" data-action="play">▶️</button>
    <input type="range" class="volume-slider" min="0" max="100" value="50" />
  </div>
</div>
```

2. **Update JavaScript** in `script.js` setupSoundDefinitions():

```javascript
{ name: 'your-sound-name', file: 'sounds/category/your-sound.mp3', type: 'file' }
```

3. **Add your audio file** to the appropriate folder

## 🎯 Recommended Sound Sources

### Free Resources

- **Freesound.org** - High-quality CC-licensed sounds
- **YouTube Audio Library** - Free ambient tracks
- **Zapsplat** - Professional sound library (free tier)
- **BBC Sound Effects** - Archive of natural sounds

### Quality Tips

- Look for "seamless loop" or "ambient" tags
- Choose sounds without sudden volume changes
- Prefer longer recordings for better loop variety
- Test sounds at different volumes before adding

## 🚀 Quick Start

1. Create the `sounds` folder structure
2. Add just a few audio files to test (start with rain.mp3, cafe.mp3)
3. Open the app and test the sounds
4. Gradually add more sounds as needed
5. The app will work with any combination of files you provide!

## 💡 Pro Tips

- **Start small**: Add 3-5 sounds first, then expand
- **Test loops**: Listen for seamless transitions
- **Mobile test**: Check performance on phones/tablets
- **Volume match**: Keep all files at similar loudness levels
- **Backup plan**: Generated sounds work if files are missing

Your Focus Sounds feature is ready to use even without any audio files - the generated sounds provide a solid fallback experience!
