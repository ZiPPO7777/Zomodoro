/**
 * Zomodoro - Pomodoro Timer Application
 * A complete productivity timer with task management, statistics, and customizable settings
 */

class ZomodoroTimer {
    constructor() {
        // Timer state
        this.timeLeft = 0;
        this.totalTime = 0;
        this.isRunning = false;
        this.currentMode = 'focus';
        this.sessionCount = 0;
        this.completedPomodoros = 0;
        this.timerInterval = null;
        
        // Focus Sounds System
        this.soundEngine = new FocusSoundEngine();
        this.activeSounds = new Set();
        this.soundsModalInitialized = false;
        
        // Settings with defaults
        this.settings = {
            focusDuration: 25,
            shortBreakDuration: 5,
            longBreakDuration: 15,
            longBreakInterval: 4,
            autoStartBreaks: false,
            autoStartPomodoros: false,
            soundEnabled: true
        };
        
        // Tasks and statistics
        this.tasks = [];
        this.statistics = {
            todayPomodoros: 0,
            weekPomodoros: 0,
            totalPomodoros: 0,
            currentStreak: 0,
            lastActivityDate: null,
            weeklyData: []
        };
        
        // Achievements system
        this.achievements = [
            { id: 'first_pomodoro', title: 'Getting Started', description: 'Complete your first Pomodoro', icon: '🍅', unlocked: false, requirement: 1 },
            { id: 'daily_warrior', title: 'Daily Warrior', description: 'Complete 5 Pomodoros in one day', icon: '⚔️', unlocked: false, requirement: 5 },
            { id: 'week_champion', title: 'Week Champion', description: 'Complete 25 Pomodoros in one week', icon: '🏆', unlocked: false, requirement: 25 },
            { id: 'streak_master', title: 'Streak Master', description: 'Maintain a 7-day streak', icon: '🔥', unlocked: false, requirement: 7 },
            { id: 'centurion', title: 'Centurion', description: 'Complete 100 total Pomodoros', icon: '💯', unlocked: false, requirement: 100 },
            { id: 'task_master', title: 'Task Master', description: 'Complete 10 tasks', icon: '✅', unlocked: false, requirement: 10 }
        ];
        
        // DOM elements
        this.initializeElements();
        
        // Initialize the application
        this.init();
        
        // Initialize clock functionality
        this.initializeClock();
        
        // Initialize section navigation
        this.initializeSectionNavigation();
    }

    initializeElements() {
        // Timer elements
        this.timerDisplay = document.getElementById('timerDisplay');
        this.timerLabel = document.getElementById('timerLabel');
        this.sessionCountEl = document.getElementById('sessionCount');
        this.progressRing = document.querySelector('.progress-ring-progress');
        this.timerContent = document.querySelector('.timer-content');
        this.timerCircle = document.querySelector('.timer-circle');
        
        // Control buttons
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        
        // Validate critical timer control elements
        if (!this.startBtn) console.error('Start button not found!');
        if (!this.pauseBtn) console.error('Pause button not found!');
        if (!this.resetBtn) console.error('Reset button not found!');
        
        // Mode buttons
        this.modeButtons = document.querySelectorAll('.mode-btn');
        
        // Header buttons
        this.settingsBtn = document.getElementById('settingsBtn');
        this.statsBtn = document.getElementById('statsBtn');
        this.themeBtn = document.getElementById('themeBtn');
        
        // Task elements
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.clearAllTasksBtn = document.getElementById('clearAllTasksBtn');
        this.taskInput = document.getElementById('taskInput');
        this.taskPomodoros = document.getElementById('taskPomodoros');
        this.taskInputContainer = document.getElementById('taskInputContainer');
        this.saveTaskBtn = document.getElementById('saveTaskBtn');
        this.cancelTaskBtn = document.getElementById('cancelTaskBtn');
        this.tasksList = document.getElementById('tasksList');
        
        // Modal elements
        this.settingsModal = document.getElementById('settingsModal');
        this.statsModal = document.getElementById('statsModal');
        this.themeModal = document.getElementById('themeModal');
        this.soundsModal = document.getElementById('soundsModal');
        this.closeSettingsBtn = document.getElementById('closeSettingsBtn');
        this.closeStatsBtn = document.getElementById('closeStatsBtn');
        this.closeThemeBtn = document.getElementById('closeThemeBtn');
        this.closeSoundsBtn = document.getElementById('closeSoundsBtn');
        this.saveSettingsBtn = document.getElementById('saveSettingsBtn');
        this.resetSettingsBtn = document.getElementById('resetSettingsBtn');
        
        // Confirmation modal elements
        this.confirmationModal = document.getElementById('confirmationModal');
        this.confirmationTitle = document.getElementById('confirmationTitle');
        this.confirmationMessage = document.getElementById('confirmationMessage');
        this.confirmationCancel = document.getElementById('confirmationCancel');
        this.confirmationConfirm = document.getElementById('confirmationConfirm');
        
        // Settings inputs
        this.focusDurationInput = document.getElementById('focusDuration');
        this.shortBreakDurationInput = document.getElementById('shortBreakDuration');
        this.longBreakDurationInput = document.getElementById('longBreakDuration');
        this.longBreakIntervalInput = document.getElementById('longBreakInterval');
        this.autoStartBreaksInput = document.getElementById('autoStartBreaks');
        this.autoStartPomodorosInput = document.getElementById('autoStartPomodoros');
        this.soundEnabledInput = document.getElementById('soundEnabled');
        
        // Statistics elements
        this.todayPomodorosEl = document.getElementById('todayPomodoros');
        this.weekPomodorosEl = document.getElementById('weekPomodoros');
        this.totalPomodorosEl = document.getElementById('totalPomodoros');
        this.currentStreakEl = document.getElementById('currentStreak');
        this.achievementsGrid = document.getElementById('achievementsGrid');
        
        // Notification elements
        this.notification = document.getElementById('notification');
        this.notificationTitle = document.getElementById('notificationTitle');
        this.notificationMessage = document.getElementById('notificationMessage');
        this.notificationClose = document.getElementById('notificationClose');
        
        // Theme elements
        this.themeOptions = document.querySelectorAll('.theme-option');
        
        // Clock elements
        this.clockTime = document.getElementById('clockTime');
        this.clockDate = document.getElementById('clockDate');
        this.clockTimezone = document.getElementById('clockTimezone');
        this.hourHand = document.getElementById('hourHand');
        this.minuteHand = document.getElementById('minuteHand');
        this.secondHand = document.getElementById('secondHand');
        this.analogClock = document.getElementById('analogClock');
        this.formatToggleBtn = document.getElementById('formatToggleBtn');
        this.analogToggleBtn = document.getElementById('analogToggleBtn');
        
        // Clock style elements
        this.styleButtons = document.querySelectorAll('.style-btn');
        this.clockDisplays = document.querySelectorAll('.clock-display');
        
        // Analog clock info elements
        this.analogDate = document.getElementById('analogDate');
        this.analogTimezone = document.getElementById('analogTimezone');
        
        // Flip clock elements
        this.flipHours = document.getElementById('flipHours');
        this.flipMinutes = document.getElementById('flipMinutes');
        this.flipSeconds = document.getElementById('flipSeconds');
        this.flipDate = document.getElementById('flipDate');
        this.flipTimezone = document.getElementById('flipTimezone');
        
        // Minimal clock elements
        this.minimalTime = document.getElementById('minimalTime');
        this.minimalPeriod = document.getElementById('minimalPeriod');
        this.minimalDate = document.getElementById('minimalDate');
        this.minimalTimezone = document.getElementById('minimalTimezone');
        
        // World clock elements
        this.nyTime = document.getElementById('nyTime');
        this.londonTime = document.getElementById('londonTime');
        this.tokyoTime = document.getElementById('tokyoTime');
        this.sydneyTime = document.getElementById('sydneyTime');
        
        // Section navigation
        this.clockNavBtn = document.getElementById('clockNavBtn');
        this.pomodoroNavBtn = document.getElementById('pomodoroNavBtn');
        this.clockSection = document.getElementById('clockSection');
        this.pomodoroSection = document.getElementById('pomodoroSection');
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.initializeProgressRing();
        this.updateTimer();
        this.updateUI();
        this.initializeTheme();
        this.updateStatistics();
        this.renderAchievements();
        this.checkDailyReset();
        
        // Request notification permission
        this.requestNotificationPermission();
        
        console.log('Zomodoro Timer initialized successfully!');
    }
    
    // Clock functionality
    initializeClock() {
        // Clock settings
        this.clockSettings = {
            is24Hour: false,
            showAnalog: true,
            currentStyle: 'digital'
        };
        
        this.clockInterval = null;
        this.flipAnimationTimeouts = {};
        
        // Setup clock event listeners
        if (this.formatToggleBtn) {
            this.formatToggleBtn.addEventListener('click', () => this.toggleTimeFormat());
        }
        if (this.analogToggleBtn) {
            this.analogToggleBtn.addEventListener('click', () => this.toggleAnalogClock());
        }
        
        // Setup style selection
        this.styleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const style = e.currentTarget.dataset.style;
                this.switchClockStyle(style);
            });
        });
        
        // Clock style button and modal
        const clockStyleBtn = document.getElementById('clockStyleBtn');
        const clockStyleModal = document.getElementById('clockStyleModal');
        const closeClockStyleBtn = document.getElementById('closeClockStyleBtn');
        
        if (clockStyleBtn && clockStyleModal) {
            clockStyleBtn.addEventListener('click', () => {
                clockStyleModal.style.display = 'flex';
            });
            
            // Close modal when clicking outside or close button
            if (closeClockStyleBtn) {
                closeClockStyleBtn.addEventListener('click', () => {
                    clockStyleModal.style.display = 'none';
                });
            }
            
            clockStyleModal.addEventListener('click', (e) => {
                if (e.target === clockStyleModal) {
                    clockStyleModal.style.display = 'none';
                }
            });
            
            // Handle style selection from modal
            const styleOptions = clockStyleModal.querySelectorAll('.clock-style-option');
            styleOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const style = option.dataset.style;
                    this.switchClockStyle(style);
                    clockStyleModal.style.display = 'none';
                    
                    // Update button text to show selected style
                    const buttonText = clockStyleBtn.querySelector('span');
                    const styleName = option.querySelector('.style-name').textContent;
                    buttonText.textContent = `Clock Style: ${styleName}`;
                    
                    // Update active state in modal
                    styleOptions.forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');
                });
            });
        }
        
        // Start the clock
        this.startClock();
    }
    
    initializeSectionNavigation() {
        // Current section (default to clock)
        this.currentSection = 'clock';
        
        // Navigation event listeners
        if (this.clockNavBtn) {
            this.clockNavBtn.addEventListener('click', () => this.switchSection('clock'));
        }
        if (this.pomodoroNavBtn) {
            this.pomodoroNavBtn.addEventListener('click', () => this.switchSection('pomodoro'));
        }
    }
    
    switchSection(section) {
        if (this.currentSection === section) return;
        
        this.currentSection = section;
        
        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === section);
        });
        
        // Update sections visibility
        if (this.clockSection && this.pomodoroSection) {
            this.clockSection.classList.toggle('active', section === 'clock');
            this.pomodoroSection.classList.toggle('active', section === 'pomodoro');
        }
        
        // Start/stop clock based on section
        if (section === 'clock') {
            this.startClock();
        } else {
            this.stopClock();
        }
        
        // Update page title
        document.title = section === 'clock' ? 'Zomodoro - Clock' : 'Zomodoro - Pomodoro Timer';
    }
    
    startClock() {
        if (this.clockInterval) return; // Already running
        
        this.updateClock();
        this.clockInterval = setInterval(() => {
            this.updateClock();
        }, 1000);
    }
    
    stopClock() {
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
            this.clockInterval = null;
        }
    }
    
    updateClock() {
        const now = new Date();
        
        // Update digital clock
        const timeString = this.formatTime(now);
        const dateString = this.formatDate(now);
        const timezoneString = this.getTimezoneString();
        
        // Update based on current style
        switch(this.clockSettings.currentStyle) {
            case 'digital':
                if (this.clockTime) this.clockTime.textContent = timeString;
                if (this.clockDate) this.clockDate.textContent = dateString;
                if (this.clockTimezone) this.clockTimezone.textContent = timezoneString;
                break;
                
            case 'analog':
                this.updateAnalogClock(now);
                if (this.analogDate) this.analogDate.textContent = dateString;
                if (this.analogTimezone) this.analogTimezone.textContent = timezoneString;
                break;
                
            case 'flip':
                this.updateFlipClock(now);
                if (this.flipDate) this.flipDate.textContent = dateString;
                if (this.flipTimezone) this.flipTimezone.textContent = timezoneString;
                break;
                
            case 'minimal':
                this.updateMinimalClock(now);
                if (this.minimalDate) this.minimalDate.textContent = dateString;
                if (this.minimalTimezone) this.minimalTimezone.textContent = timezoneString;
                break;
        }
        
        // Update world clocks
        this.updateWorldClocks();
    }
    
    switchClockStyle(style) {
        this.clockSettings.currentStyle = style;
        
        // Update style buttons
        this.styleButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.style === style);
        });
        
        // Update clock displays
        this.clockDisplays.forEach(display => {
            display.classList.remove('active');
        });
        
        const activeDisplay = document.getElementById(`${style}ClockDisplay`);
        if (activeDisplay) {
            activeDisplay.classList.add('active');
        }
        
        // Update the current time immediately
        this.updateClock();
    }
    
    updateFlipClock(date) {
        const hours = this.clockSettings.is24Hour ? 
            date.getHours().toString().padStart(2, '0') :
            (date.getHours() % 12 || 12).toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        
        this.animateFlipCard('flipHours', hours);
        this.animateFlipCard('flipMinutes', minutes);
        this.animateFlipCard('flipSeconds', seconds);
    }
    
    animateFlipCard(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const front = element.querySelector('.flip-card-front');
        const back = element.querySelector('.flip-card-back');
        const inner = element.querySelector('.flip-card-inner');
        
        if (front.textContent !== newValue) {
            // Set the back to the new value
            back.textContent = newValue;
            
            // Add flip animation
            inner.style.transform = 'rotateX(180deg)';
            
            // Clear any existing timeout
            if (this.flipAnimationTimeouts[elementId]) {
                clearTimeout(this.flipAnimationTimeouts[elementId]);
            }
            
            // After animation completes, update front and reset
            this.flipAnimationTimeouts[elementId] = setTimeout(() => {
                front.textContent = newValue;
                inner.style.transform = 'rotateX(0deg)';
            }, 300);
        }
    }
    
    updateMinimalClock(date) {
        const is24Hour = this.clockSettings.is24Hour;
        
        if (is24Hour) {
            const timeString = date.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            if (this.minimalTime) this.minimalTime.textContent = timeString;
            if (this.minimalPeriod) this.minimalPeriod.style.display = 'none';
        } else {
            const timeString = date.toLocaleTimeString('en-US', {
                hour12: false,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
            const period = date.getHours() >= 12 ? 'PM' : 'AM';
            
            if (this.minimalTime) this.minimalTime.textContent = timeString;
            if (this.minimalPeriod) {
                this.minimalPeriod.textContent = period;
                this.minimalPeriod.style.display = 'block';
            }
        }
    }
    
    formatTime(date) {
        if (this.clockSettings.is24Hour) {
            return date.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        } else {
            return date.toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    }
    
    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    getTimezoneString() {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return `${timezone} Time`;
    }
    
    updateAnalogClock(date) {
        if (!this.hourHand || !this.minuteHand || !this.secondHand) return;
        
        const hours = date.getHours() % 12;
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        
        // Calculate angles (0 degrees = 12 o'clock)
        const secondAngle = (seconds * 6); // 6 degrees per second
        const minuteAngle = (minutes * 6) + (seconds * 0.1); // 6 degrees per minute + smooth transition
        const hourAngle = (hours * 30) + (minutes * 0.5); // 30 degrees per hour + smooth transition
        
        // Apply rotations
        this.secondHand.style.transform = `rotate(${secondAngle}deg)`;
        this.minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        this.hourHand.style.transform = `rotate(${hourAngle}deg)`;
    }
    
    updateWorldClocks() {
        const now = new Date();
        
        // World time zones
        const timeZones = {
            'nyTime': 'America/New_York',
            'londonTime': 'Europe/London',
            'tokyoTime': 'Asia/Tokyo',
            'sydneyTime': 'Australia/Sydney'
        };
        
        Object.entries(timeZones).forEach(([elementId, timezone]) => {
            const element = this[elementId];
            if (element) {
                try {
                    const timeString = now.toLocaleTimeString('en-US', {
                        timeZone: timezone,
                        hour12: !this.clockSettings.is24Hour,
                        hour: this.clockSettings.is24Hour ? '2-digit' : 'numeric',
                        minute: '2-digit'
                    });
                    element.textContent = timeString;
                } catch (error) {
                    element.textContent = '--:--';
                }
            }
        });
    }
    
    toggleTimeFormat() {
        this.clockSettings.is24Hour = !this.clockSettings.is24Hour;
        this.formatToggleBtn.textContent = this.clockSettings.is24Hour ? '24 Hour' : '12 Hour';
        this.updateClock();
    }
    
    toggleAnalogClock() {
        this.clockSettings.showAnalog = !this.clockSettings.showAnalog;
        this.analogToggleBtn.textContent = this.clockSettings.showAnalog ? 'Hide Analog' : 'Show Analog';
        
        if (this.analogClock) {
            this.analogClock.style.display = this.clockSettings.showAnalog ? 'block' : 'none';
        }
    }

    setupEventListeners() {
        // Timer controls
        if (this.startBtn) {
            this.startBtn.addEventListener('click', () => {
                console.log('Start button clicked');
                this.startTimer();
            });
        }
        if (this.pauseBtn) {
            this.pauseBtn.addEventListener('click', () => {
                console.log('Pause button clicked');
                this.pauseTimer();
            });
        }
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => {
                console.log('Reset button clicked');
                this.resetTimer();
            });
        }
        
        // Mode selection
        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.isRunning) {
                    this.setMode(e.target.dataset.mode);
                }
            });
        });
        
        // Header controls
        this.settingsBtn.addEventListener('click', () => this.openModal('settings'));
        this.statsBtn.addEventListener('click', () => this.openModal('stats'));
        this.themeBtn.addEventListener('click', () => this.openModal('theme'));
        this.soundsBtn = document.getElementById('soundsBtn');
        this.soundsBtn.addEventListener('click', () => this.openModal('sounds'));
        
        // Task management
        this.addTaskBtn.addEventListener('click', () => this.showTaskInput());
        this.clearAllTasksBtn.addEventListener('click', () => this.clearAllTasks());
        this.saveTaskBtn.addEventListener('click', () => this.saveTask());
        this.cancelTaskBtn.addEventListener('click', () => this.hideTaskInput());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveTask();
        });
        
        // Modal controls
        this.closeSettingsBtn.addEventListener('click', () => this.closeModal('settings'));
        this.closeStatsBtn.addEventListener('click', () => this.closeModal('stats'));
        this.closeThemeBtn.addEventListener('click', () => this.closeModal('theme'));
        this.closeSoundsBtn.addEventListener('click', () => this.closeModal('sounds'));
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.resetSettingsBtn.addEventListener('click', () => this.resetSettings());
        
        // Theme selection
        this.themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const theme = e.currentTarget.dataset.theme;
                this.setTheme(theme);
            });
        });
        
        // Notification close
        this.notificationClose.addEventListener('click', () => this.hideNotification());
        
        // Confirmation modal
        this.confirmationCancel.addEventListener('click', () => this.hideConfirmation());
        this.confirmationModal.addEventListener('click', (e) => {
            if (e.target === this.confirmationModal) {
                this.hideConfirmation();
            }
        });
        
        // Close modals on outside click
        [this.settingsModal, this.statsModal, this.themeModal, this.soundsModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    const modalType = modal.id.replace('Modal', '');
                    this.closeModal(modalType);
                }
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.isRunning ? this.pauseTimer() : this.startTimer();
                    break;
                case 'r':
                    e.preventDefault();
                    this.resetTimer();
                    break;
                case 's':
                    e.preventDefault();
                    this.openModal('settings');
                    break;
                case 'Escape':
                    this.closeModal('settings');
                    this.closeModal('stats');
                    this.closeModal('theme');
                    break;
            }
        });
        
        // Handle visibility change for accurate timing
        document.addEventListener('visibilitychange', () => {
            if (this.isRunning && !document.hidden) {
                this.syncTimer();
            }
        });
        
        // Handle window resize for responsive progress ring
        window.addEventListener('resize', () => {
            this.initializeProgressRing();
            this.updateProgress();
        });
    }

    setMode(mode) {
        this.currentMode = mode;
        this.modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        switch(mode) {
            case 'focus':
                this.timeLeft = this.settings.focusDuration * 60;
                this.timerLabel.textContent = 'Focus Time';
                this.timerCircle.className = 'timer-circle focus-mode';
                break;
            case 'short-break':
                this.timeLeft = this.settings.shortBreakDuration * 60;
                this.timerLabel.textContent = 'Short Break';
                this.timerCircle.className = 'timer-circle break-mode';
                break;
            case 'long-break':
                this.timeLeft = this.settings.longBreakDuration * 60;
                this.timerLabel.textContent = 'Long Break';
                this.timerCircle.className = 'timer-circle break-mode';
                break;
        }
        
        this.totalTime = this.timeLeft;
        this.updateTimer();
        this.updateProgress();
    }

    startTimer() {
        if (this.timeLeft <= 0) {
            this.setMode(this.currentMode);
        }
        
        this.isRunning = true;
        this.startTime = Date.now() - (this.totalTime - this.timeLeft) * 1000;
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            this.updateProgress();
            
            if (this.timeLeft <= 0) {
                this.completeSession();
            }
        }, 1000);
        
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.timerContent.classList.add('active');
        
        this.playSound('start');
    }

    pauseTimer() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        
        if (this.startBtn && this.pauseBtn) {
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
        }
        
        if (this.timerContent) {
            this.timerContent.classList.remove('active');
        }
        
        console.log('Timer paused');
    }

    resetTimer() {
        this.pauseTimer();
        this.setMode(this.currentMode);
        
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
    }

    completeSession() {
        this.pauseTimer();
        
        if (this.currentMode === 'focus') {
            this.completedPomodoros++;
            this.sessionCount++;
            this.updateStatistics(true);
            this.checkAchievements();
            
            // Determine next mode
            if (this.sessionCount % this.settings.longBreakInterval === 0) {
                this.nextMode = 'long-break';
            } else {
                this.nextMode = 'short-break';
            }
            
            this.showNotification('Focus Session Complete!', 'Great job! Time for a break.');
            this.playSound('complete');
            
            if (this.settings.autoStartBreaks) {
                setTimeout(() => {
                    this.setMode(this.nextMode);
                    this.startTimer();
                }, 3000);
            } else {
                this.setMode(this.nextMode);
            }
        } else {
            this.showNotification('Break Complete!', 'Ready to get back to work?');
            this.playSound('complete');
            
            if (this.settings.autoStartPomodoros) {
                setTimeout(() => {
                    this.setMode('focus');
                    this.startTimer();
                }, 3000);
            } else {
                this.setMode('focus');
            }
        }
        
        this.saveData();
    }

    updateTimer() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update session count display
        this.sessionCountEl.textContent = 
            `Session ${Math.min(this.sessionCount + 1, this.settings.longBreakInterval)} of ${this.settings.longBreakInterval}`;
        
        // Update page title
        if (this.isRunning) {
            document.title = `${this.timerDisplay.textContent} - ${this.timerLabel.textContent} | Zomodoro`;
        } else {
            document.title = 'Zomodoro - Pomodoro Timer';
        }
    }

    updateProgress() {
        // Get the current radius from the progress ring
        const radius = parseFloat(this.progressRing.getAttribute('r'));
        const circumference = 2 * Math.PI * radius;
        const progress = 1 - (this.timeLeft / this.totalTime);
        const strokeDashoffset = circumference * (1 - progress);
        
        // Update stroke-dasharray to match current radius
        this.progressRing.style.strokeDasharray = circumference;
        this.progressRing.style.strokeDashoffset = strokeDashoffset;
    }

    // Initialize progress ring on load and resize
    initializeProgressRing() {
        const radius = parseFloat(this.progressRing.getAttribute('r'));
        const circumference = 2 * Math.PI * radius;
        this.progressRing.style.strokeDasharray = circumference;
        this.progressRing.style.strokeDashoffset = circumference;
    }

    updateUI() {
        this.renderTasks();
        this.updateStatisticsDisplay();
    }

    syncTimer() {
        if (!this.isRunning || !this.startTime) return;
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        this.timeLeft = Math.max(0, this.totalTime - elapsed);
        
        this.updateTimer();
        this.updateProgress();
        
        if (this.timeLeft <= 0) {
            this.completeSession();
        }
    }

    // Task Management Methods
    showTaskInput() {
        this.taskInputContainer.style.display = 'block';
        this.taskInput.focus();
    }

    hideTaskInput() {
        this.taskInputContainer.style.display = 'none';
        this.taskInput.value = '';
        this.taskPomodoros.value = '1';
    }

    saveTask() {
        const name = this.taskInput.value.trim();
        const pomodoros = parseInt(this.taskPomodoros.value) || 1;
        
        if (!name) return;
        
        const task = {
            id: Date.now(),
            name,
            requiredPomodoros: pomodoros,
            completedPomodoros: 0,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.push(task);
        this.hideTaskInput();
        this.renderTasks();
        this.saveData();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.renderTasks();
        this.saveData();
    }

    clearAllTasks() {
        if (this.tasks.length === 0) {
            this.showNotification('No Tasks', 'There are no tasks to clear.');
            return;
        }

        const taskCount = this.tasks.length;
        this.showConfirmation(
            'Clear All Tasks',
            `Are you sure you want to clear all ${taskCount} task${taskCount === 1 ? '' : 's'}?\n\nThis action cannot be undone.`,
            () => {
                this.tasks = [];
                this.renderTasks();
                this.saveData();
                this.showNotification('Tasks Cleared', `Successfully cleared ${taskCount} task${taskCount === 1 ? '' : 's'}.`);
            }
        );
    }

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
            this.saveData();
            this.checkAchievements();
        }
    }

    assignPomodoroToTask() {
        const activeTask = this.tasks.find(task => !task.completed && task.completedPomodoros < task.requiredPomodoros);
        if (activeTask) {
            activeTask.completedPomodoros++;
            if (activeTask.completedPomodoros >= activeTask.requiredPomodoros) {
                activeTask.completed = true;
            }
            this.renderTasks();
            this.saveData();
        }
    }

    renderTasks() {
        this.tasksList.innerHTML = '';
        
        // Update clear all button state
        this.clearAllTasksBtn.disabled = this.tasks.length === 0;
        
        if (this.tasks.length === 0) {
            this.tasksList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    <p>No tasks yet. Add a task to get started!</p>
                </div>
            `;
            return;
        }
        
        this.tasks.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            taskEl.innerHTML = `
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="timer.toggleTask(${task.id})"></div>
                <div class="task-content">
                    <div class="task-name ${task.completed ? 'completed' : ''}">${task.name}</div>
                    <div class="task-progress">${task.completedPomodoros}/${task.requiredPomodoros} Pomodoros</div>
                </div>
                <div class="task-actions">
                    <button class="task-action-btn delete" onclick="timer.deleteTask(${task.id})" title="Delete task">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            `;
            
            this.tasksList.appendChild(taskEl);
        });
    }

    // Settings Methods
    openModal(modalType) {
        if (modalType === 'settings') {
            this.loadSettingsToForm();
            this.settingsModal.classList.add('show');
        } else if (modalType === 'stats') {
            this.updateStatisticsDisplay();
            this.statsModal.classList.add('show');
        } else if (modalType === 'theme') {
            this.updateThemeSelector();
            this.themeModal.classList.add('show');
        } else if (modalType === 'sounds') {
            this.initializeSoundsModal();
            this.soundsModal.classList.add('show');
        }
    }

    closeModal(modalType) {
        if (modalType === 'settings') {
            this.settingsModal.classList.remove('show');
        } else if (modalType === 'stats') {
            this.statsModal.classList.remove('show');
        } else if (modalType === 'theme') {
            this.themeModal.classList.remove('show');
        } else if (modalType === 'sounds') {
            this.soundsModal.classList.remove('show');
        }
    }

    // Sound Management Methods
    initializeSoundsModal() {
        // Check if already initialized to avoid duplicate event listeners
        if (this.soundsModalInitialized) {
            this.updateSoundsModalUI();
            return;
        }
        
        // Initialize sound controls
        const soundOptions = document.querySelectorAll('.sound-option');
        const masterVolumeSlider = document.getElementById('masterVolume');
        const masterVolumeValue = document.getElementById('masterVolumeValue');
        const stopAllBtn = document.getElementById('stopAllSounds');

        // Set up individual sound controls
        soundOptions.forEach(option => {
            const soundName = option.dataset.sound;
            const playBtn = option.querySelector('.sound-btn');
            const volumeSlider = option.querySelector('.volume-slider');

            // Play/pause button
            playBtn.addEventListener('click', () => {
                this.toggleSound(soundName, option, playBtn);
            });

            // Volume control
            volumeSlider.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                this.soundEngine.setVolume(soundName, volume);
                console.log(`Setting volume for ${soundName} to ${volume}`);
            });
            
            // Initialize volume slider with current sound volume
            const currentVolume = this.soundEngine.sounds.get(soundName)?.volume || 0.5;
            volumeSlider.value = Math.round(currentVolume * 100);

            // Update UI based on current state
            this.updateSoundOptionUI(option, soundName);
        });

        // Master volume control
        masterVolumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            this.soundEngine.setMasterVolume(volume);
            masterVolumeValue.textContent = e.target.value + '%';
            console.log(`Setting master volume to ${volume}`);
        });

        // Stop all sounds button
        stopAllBtn.addEventListener('click', () => {
            this.stopAllSounds();
        });

        // Update master volume display
        masterVolumeValue.textContent = Math.round(this.soundEngine.masterVolume * 100) + '%';
        masterVolumeSlider.value = Math.round(this.soundEngine.masterVolume * 100);
        
        // Mark as initialized
        this.soundsModalInitialized = true;
    }
    
    updateSoundsModalUI() {
        // Update all UI elements when modal reopens
        const soundOptions = document.querySelectorAll('.sound-option');
        const masterVolumeSlider = document.getElementById('masterVolume');
        const masterVolumeValue = document.getElementById('masterVolumeValue');
        
        soundOptions.forEach(option => {
            const soundName = option.dataset.sound;
            const volumeSlider = option.querySelector('.volume-slider');
            
            // Update sound option UI
            this.updateSoundOptionUI(option, soundName);
            
            // Update volume slider position
            if (volumeSlider && this.soundEngine.sounds.has(soundName)) {
                const currentVolume = this.soundEngine.sounds.get(soundName).volume;
                volumeSlider.value = Math.round(currentVolume * 100);
            }
        });
        
        // Update master volume display
        masterVolumeValue.textContent = Math.round(this.soundEngine.masterVolume * 100) + '%';
        masterVolumeSlider.value = Math.round(this.soundEngine.masterVolume * 100);
    }

    async toggleSound(soundName, optionElement, playBtn) {
        // Prevent multiple rapid clicks
        if (playBtn.disabled) return;
        
        const currentlyPlaying = this.soundEngine.isPlaying(soundName);
        
        if (currentlyPlaying) {
            // Stopping is immediate - no loading required
            playBtn.disabled = true;
            this.updateSoundOptionUI(optionElement, soundName, false);
            this.soundEngine.stopSound(soundName);
            this.activeSounds.delete(soundName);
            
            // Quick re-enable for stop action
            setTimeout(() => {
                playBtn.disabled = false;
            }, 100);
        } else {
            // Starting might require loading - show loading state
            const sound = this.soundEngine.sounds.get(soundName);
            const isGitHubHosted = sound && sound.file && sound.file.includes('github');
            
            if (isGitHubHosted && !sound.loaded) {
                // Show loading state for GitHub-hosted sounds
                playBtn.disabled = true;
                playBtn.textContent = '⏳';
                playBtn.title = 'Loading...';
                optionElement.classList.add('loading');
            } else {
                // Immediate feedback for local/cached sounds
                playBtn.disabled = true;
                this.updateSoundOptionUI(optionElement, soundName, true);
            }
            
            try {
                // Start playing (async for GitHub sounds)
                await this.soundEngine.playSound(soundName);
                this.activeSounds.add(soundName);
                
                // Update UI to playing state
                optionElement.classList.remove('loading');
                this.updateSoundOptionUI(optionElement, soundName, true);
                
            } catch (error) {
                console.warn('Failed to play sound:', error);
                // Reset UI on error
                optionElement.classList.remove('loading');
                this.updateSoundOptionUI(optionElement, soundName, false);
            } finally {
                // Re-enable button
                playBtn.disabled = false;
            }
        }
    }

    updateSoundOptionUI(optionElement, soundName, forceState = null) {
        const playBtn = optionElement.querySelector('.sound-btn');
        
        // Use forced state if provided, otherwise check actual state
        const isPlaying = forceState !== null ? forceState : this.soundEngine.isPlaying(soundName);

        if (isPlaying) {
            optionElement.classList.add('playing');
            playBtn.textContent = '⏸️';
            playBtn.classList.add('pause');
            playBtn.title = 'Pause';
        } else {
            optionElement.classList.remove('playing');
            playBtn.textContent = '▶️';
            playBtn.classList.remove('pause');
            playBtn.title = 'Play';
        }
    }

    stopAllSounds() {
        this.soundEngine.stopAllSounds();
        this.activeSounds.clear();
        
        // Update all UI elements with a delay to ensure cleanup is complete
        setTimeout(() => {
            const soundOptions = document.querySelectorAll('.sound-option');
            soundOptions.forEach(option => {
                const soundName = option.dataset.sound;
                this.updateSoundOptionUI(option, soundName);
            });
        }, 150);

        this.showNotification('🔇 Sounds Stopped', 'All focus sounds have been stopped.');
    }

    // Auto-manage sounds based on timer state
    handleTimerSounds() {
        // Optional: Auto-pause sounds during breaks or auto-resume during focus
        if (this.currentMode === 'focus' && this.isRunning) {
            // Could auto-resume saved sounds
        } else if (!this.isRunning) {
            // Could auto-pause all sounds
        }
    }

    loadSettingsToForm() {
        this.focusDurationInput.value = this.settings.focusDuration;
        this.shortBreakDurationInput.value = this.settings.shortBreakDuration;
        this.longBreakDurationInput.value = this.settings.longBreakDuration;
        this.longBreakIntervalInput.value = this.settings.longBreakInterval;
        this.autoStartBreaksInput.checked = this.settings.autoStartBreaks;
        this.autoStartPomodorosInput.checked = this.settings.autoStartPomodoros;
        this.soundEnabledInput.checked = this.settings.soundEnabled;
    }

    saveSettings() {
        this.settings = {
            focusDuration: parseInt(this.focusDurationInput.value) || 25,
            shortBreakDuration: parseInt(this.shortBreakDurationInput.value) || 5,
            longBreakDuration: parseInt(this.longBreakDurationInput.value) || 15,
            longBreakInterval: parseInt(this.longBreakIntervalInput.value) || 4,
            autoStartBreaks: this.autoStartBreaksInput.checked,
            autoStartPomodoros: this.autoStartPomodorosInput.checked,
            soundEnabled: this.soundEnabledInput.checked
        };
        
        this.setMode(this.currentMode);
        this.closeModal('settings');
        this.saveData();
        this.showNotification('Settings Saved', 'Your preferences have been updated.');
    }

    resetSettings() {
        this.settings = {
            focusDuration: 25,
            shortBreakDuration: 5,
            longBreakDuration: 15,
            longBreakInterval: 4,
            autoStartBreaks: false,
            autoStartPomodoros: false,
            soundEnabled: true
        };
        
        this.loadSettingsToForm();
        this.setMode(this.currentMode);
        this.saveData();
    }

    // Statistics and Achievements
    updateStatistics(completedPomodoro = false) {
        const today = new Date().toDateString();
        
        if (completedPomodoro) {
            this.statistics.totalPomodoros++;
            
            if (this.statistics.lastActivityDate === today) {
                this.statistics.todayPomodoros++;
            } else {
                if (this.statistics.lastActivityDate === this.getYesterday()) {
                    this.statistics.currentStreak++;
                } else {
                    this.statistics.currentStreak = 1;
                }
                this.statistics.todayPomodoros = 1;
                this.statistics.lastActivityDate = today;
            }
            
            this.updateWeeklyStats();
            this.assignPomodoroToTask();
        }
        
        this.saveData();
    }

    updateWeeklyStats() {
        const today = new Date();
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
        const weekKey = weekStart.toDateString();
        
        let weekData = this.statistics.weeklyData.find(w => w.week === weekKey);
        if (!weekData) {
            weekData = { week: weekKey, pomodoros: 0 };
            this.statistics.weeklyData.push(weekData);
        }
        
        weekData.pomodoros++;
        this.statistics.weekPomodoros = weekData.pomodoros;
        
        this.statistics.weeklyData = this.statistics.weeklyData.slice(-8);
    }

    updateStatisticsDisplay() {
        this.todayPomodorosEl.textContent = this.statistics.todayPomodoros;
        this.weekPomodorosEl.textContent = this.statistics.weekPomodoros;
        this.totalPomodorosEl.textContent = this.statistics.totalPomodoros;
        this.currentStreakEl.textContent = this.statistics.currentStreak;
    }

    checkAchievements() {
        const completedTasks = this.tasks.filter(task => task.completed).length;
        
        this.achievements.forEach(achievement => {
            if (achievement.unlocked) return;
            
            let shouldUnlock = false;
            
            switch(achievement.id) {
                case 'first_pomodoro':
                    shouldUnlock = this.statistics.totalPomodoros >= 1;
                    break;
                case 'daily_warrior':
                    shouldUnlock = this.statistics.todayPomodoros >= 5;
                    break;
                case 'week_champion':
                    shouldUnlock = this.statistics.weekPomodoros >= 25;
                    break;
                case 'streak_master':
                    shouldUnlock = this.statistics.currentStreak >= 7;
                    break;
                case 'centurion':
                    shouldUnlock = this.statistics.totalPomodoros >= 100;
                    break;
                case 'task_master':
                    shouldUnlock = completedTasks >= 10;
                    break;
            }
            
            if (shouldUnlock) {
                achievement.unlocked = true;
                this.showNotification(`Achievement Unlocked! ${achievement.icon}`, achievement.title);
                this.playSound('achievement');
            }
        });
        
        this.renderAchievements();
    }

    renderAchievements() {
        this.achievementsGrid.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.className = `achievement-card ${achievement.unlocked ? 'unlocked' : ''}`;
            
            achievementEl.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
            `;
            
            this.achievementsGrid.appendChild(achievementEl);
        });
    }

    // Notification System
    async requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    }

    showNotification(title, message) {
        this.notificationTitle.textContent = title;
        this.notificationMessage.textContent = message;
        this.notification.classList.add('show');
        
        setTimeout(() => {
            this.hideNotification();
        }, 5000);
        
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff6b6b"%3E%3Ccircle cx="12" cy="12" r="10"/%3E%3Cpath fill="white" d="M12 6v6l4 2"/%3E%3C/svg%3E',
                silent: !this.settings.soundEnabled
            });
        }
    }

    hideNotification() {
        this.notification.classList.remove('show');
    }

    // Custom Confirmation Modal
    showConfirmation(title, message, onConfirm) {
        this.confirmationTitle.textContent = title;
        this.confirmationMessage.textContent = message;
        this.confirmationModal.classList.add('show');
        
        // Remove any existing event listeners
        const newConfirmBtn = this.confirmationConfirm.cloneNode(true);
        this.confirmationConfirm.parentNode.replaceChild(newConfirmBtn, this.confirmationConfirm);
        this.confirmationConfirm = newConfirmBtn;
        
        // Add new event listener
        this.confirmationConfirm.addEventListener('click', () => {
            this.hideConfirmation();
            if (onConfirm) onConfirm();
        });
    }

    hideConfirmation() {
        this.confirmationModal.classList.remove('show');
    }

    playSound(type) {
        if (!this.settings.soundEnabled) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            switch(type) {
                case 'start':
                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    break;
                case 'complete':
                    [523, 659, 784].forEach((freq, i) => {
                        const osc = audioContext.createOscillator();
                        const gain = audioContext.createGain();
                        osc.connect(gain);
                        gain.connect(audioContext.destination);
                        osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15);
                        gain.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.15);
                        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.3);
                        osc.start(audioContext.currentTime + i * 0.15);
                        osc.stop(audioContext.currentTime + i * 0.15 + 0.3);
                    });
                    return;
                case 'achievement':
                    [440, 554, 659, 880].forEach((freq, i) => {
                        const osc = audioContext.createOscillator();
                        const gain = audioContext.createGain();
                        osc.connect(gain);
                        gain.connect(audioContext.destination);
                        osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1);
                        gain.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.1);
                        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.2);
                        osc.start(audioContext.currentTime + i * 0.1);
                        osc.stop(audioContext.currentTime + i * 0.1 + 0.2);
                    });
                    return;
            }
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (error) {
            console.log('Audio not supported');
        }
    }

    // Theme Management
    initializeTheme() {
        const savedTheme = localStorage.getItem('zomodoro-theme') || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('zomodoro-theme', theme);
        this.updateThemeSelector();
    }

    updateThemeSelector() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        this.themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === currentTheme);
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    // Data Persistence
    saveData() {
        const data = {
            settings: this.settings,
            tasks: this.tasks,
            statistics: this.statistics,
            achievements: this.achievements,
            sessionCount: this.sessionCount,
            completedPomodoros: this.completedPomodoros
        };
        
        localStorage.setItem('zomodoro-data', JSON.stringify(data));
    }

    loadData() {
        const savedData = localStorage.getItem('zomodoro-data');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.settings = { ...this.settings, ...data.settings };
                this.tasks = data.tasks || [];
                this.statistics = { ...this.statistics, ...data.statistics };
                this.achievements = data.achievements || this.achievements;
                this.sessionCount = data.sessionCount || 0;
                this.completedPomodoros = data.completedPomodoros || 0;
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
        
        this.setMode('focus');
        this.renderTasks();
    }

    // Utility Methods
    checkDailyReset() {
        const today = new Date().toDateString();
        const lastActivity = this.statistics.lastActivityDate;
        
        if (lastActivity && lastActivity !== today) {
            const yesterday = this.getYesterday();
            if (lastActivity !== yesterday) {
                this.statistics.currentStreak = 0;
            }
            this.statistics.todayPomodoros = 0;
        }
        
        this.updateWeeklyPomodoros();
    }

    getYesterday() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toDateString();
    }

    updateWeeklyPomodoros() {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const weekKey = startOfWeek.toDateString();
        
        const currentWeekData = this.statistics.weeklyData.find(w => w.week === weekKey);
        this.statistics.weekPomodoros = currentWeekData ? currentWeekData.pomodoros : 0;
    }
}

/**
 * Enhanced Focus Sound Engine - Supports both generated sounds and custom audio files
 * Optimized for mobile performance and battery life
 */
class FocusSoundEngine {
    constructor() {
        this.audioContext = null;
        this.sounds = new Map();
        this.masterGain = null;
        this.masterVolume = 0.7;
        this.audioFiles = new Map(); // Store loaded audio files
        this.soundSources = new Map(); // Track active audio sources
        this.preloadingQueue = new Set(); // Track sounds being preloaded
        this.initializeAudioContext();
        this.setupSoundDefinitions();
        this.preloadCozyChillSounds(); // Preload GitHub-hosted sounds
    }

    initializeAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.setValueAtTime(this.masterVolume, this.audioContext.currentTime);
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }

    setupSoundDefinitions() {
        // Define all available sounds with their audio file paths
        const soundDefinitions = [
            // Cozy & Chill (generated)
            { name: 'happy-panda', file: 'https://raw.githubusercontent.com/ZiPPO7777/Zomodoro--Android-App/main/Cozy%26Chill1/HappyPanda.mp4', type: 'file' },
            { name: 'sleepy-bunny', file: 'https://raw.githubusercontent.com/ZiPPO7777/Zomodoro--Android-App/main/Cozy%26Chill1/SleepyBunny.mp4', type: 'file' },
            { name: 'lemon-drop', file: 'https://raw.githubusercontent.com/ZiPPO7777/Zomodoro--Android-App/main/Cozy%26Chill1/LemonDrop.mp4', type: 'file' },
            { name: 'dreamy-fox', file: 'https://raw.githubusercontent.com/ZiPPO7777/Zomodoro--Android-App/main/Cozy%26Chill1/DreamyFox.mp4', type: 'file' },
            { name: 'fluffy-blanket', file: 'https://raw.githubusercontent.com/ZiPPO7777/Zomodoro--Android-App/main/Cozy%26Chill1/FluffyBlanket.mp4', type: 'file' },
            { name: 'cinnamon-toast', file: 'https://raw.githubusercontent.com/ZiPPO7777/Zomodoro--Android-App/main/Cozy%26Chill1/CinnamonToast.mp4', type: 'file' },
            
            // Playful & Energetic
            { name: 'bouncy-squirrel', file: 'https://raw.githubusercontent.com/ZiPPO7777/Zomodoro--Android-App/main/Music/BouncySquirrel.mp4', type: 'file' },
            { name: 'jellybean-jump', file: 'https://raw.githubusercontent.com/ZiPPO7777/Zomodoro--Android-App/main/Music/JellybeanJump.mp4', type: 'file' },
            { name: 'sprinkles-dance', file: 'https://raw.githubusercontent.com/ZiPPO7777/Zomodoro--Android-App/main/Music/SprinklesDance.mp4', type: 'file' },
            { name: 'giggle-goose', file: 'https://raw.githubusercontent.com/ZiPPO7777/Zomodoro--Android-App/main/GiggleGoose.mp4', type: 'file' },
            { name: 'rainbow-hamster', file: 'https://raw.githubusercontent.com/ZiPPO7777/Zomodoro--Android-App/main/Music/RainbowHamster.mp4', type: 'file' },
            { name: 'cherry-pop', file: 'https://raw.githubusercontent.com/ZiPPO7777/Zomodoro--Android-App/main/Music/CherryPop.mp4', type: 'file' }
        ];

        // Initialize sound objects
        soundDefinitions.forEach(sound => {
            const isLocal = !sound.file || !sound.file.includes('github');
            this.sounds.set(sound.name, {
                name: sound.name,
                file: sound.file,
                type: sound.type,
                volume: 0.5,
                playing: false,
                gainNode: null,
                audioBuffer: null,
                loaded: isLocal // Mark local/generated sounds as loaded immediately
            });
        });
    }

    async loadAudioFile(soundName) {
        const sound = this.sounds.get(soundName);
        if (!sound || sound.type !== 'file' || sound.loaded) return;

        // Prevent duplicate loading requests
        if (this.preloadingQueue.has(soundName)) {
            // Wait for existing load to complete
            while (this.preloadingQueue.has(soundName)) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            return;
        }

        this.preloadingQueue.add(soundName);

        try {
            console.log(`Loading sound: ${soundName} from ${sound.file}`);
            
            // Shorter timeout for GitHub requests to fail fast
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            
            const response = await fetch(sound.file, { 
                signal: controller.signal,
                cache: 'force-cache', // Use browser cache when possible
                mode: 'cors' // Ensure CORS is handled properly
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                console.warn(`Sound file not found: ${sound.file}. Status: ${response.status}`);
                sound.type = 'generated';
                return;
            }
            
            const arrayBuffer = await response.arrayBuffer();
            
            // Add timeout for audio decoding as well
            const decodePromise = this.audioContext.decodeAudioData(arrayBuffer);
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Decode timeout')), 3000)
            );
            
            const audioBuffer = await Promise.race([decodePromise, timeoutPromise]);
            
            sound.audioBuffer = audioBuffer;
            sound.loaded = true;
            console.log(`Successfully loaded: ${soundName}`);
            
        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn(`Loading timeout for ${soundName}, will use fallback`);
            } else {
                console.warn(`Error loading ${soundName}:`, error.message);
            }
            // Switch to generated sound as fallback
            sound.type = 'generated';
        } finally {
            this.preloadingQueue.delete(soundName);
        }
    }
    
    // Preload Cozy & Chill sounds for better responsiveness
    async preloadCozyChillSounds() {
        const cozyChillSounds = [
            'happy-panda', 'sleepy-bunny', 'lemon-drop', 
            'dreamy-fox', 'fluffy-blanket', 'cinnamon-toast'
        ];
        
        // Start preloading immediately without delay for critical UX
        const preloadPromises = cozyChillSounds.map(async (soundName, index) => {
            if (this.sounds.has(soundName)) {
                // Small staggered delay to prevent overwhelming the network
                await new Promise(resolve => setTimeout(resolve, index * 100));
                try {
                    await this.loadAudioFile(soundName);
                    console.log(`Preloaded: ${soundName}`);
                } catch (error) {
                    console.warn(`Failed to preload ${soundName}:`, error.message);
                }
            }
        });
        
        // Don't await all - let them load in background
        Promise.allSettled(preloadPromises).then(() => {
            console.log('Cozy & Chill sounds preloading completed');
        });
    }

    async playSound(soundName) {
        if (!this.audioContext || !this.sounds.has(soundName)) return;

        const sound = this.sounds.get(soundName);
        if (sound.playing) return;

        // Set playing state immediately for UI responsiveness
        sound.playing = true;

        try {
            // Resume audio context if suspended
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            if (sound.type === 'file') {
                // For GitHub-hosted files, load asynchronously without blocking
                if (sound.file && sound.file.includes('github') && !sound.loaded) {
                    // Start loading in background, play immediately when ready
                    this.loadAudioFile(soundName).then(() => {
                        if (sound.playing) { // Check if still supposed to be playing
                            this.playAudioFile(soundName);
                        }
                    }).catch(() => {
                        // Fallback to generated sound if loading fails
                        if (sound.playing) {
                            this.playGeneratedSound(soundName);
                        }
                    });
                } else {
                    // Play immediately for loaded/local files
                    await this.playAudioFile(soundName);
                }
            } else {
                // Generated sounds play immediately
                this.playGeneratedSound(soundName);
            }
            
        } catch (error) {
            console.warn('Error playing sound:', error);
            // Reset playing state on error
            sound.playing = false;
            throw error; // Re-throw to let caller handle UI updates
        }
    }

    async playAudioFile(soundName) {
        const sound = this.sounds.get(soundName);
        
        // For GitHub-hosted sounds that aren't loaded yet, start with generated fallback
        // and switch to file when ready
        if (!sound.loaded && sound.file && sound.file.includes('github')) {
            console.log(`${soundName} not loaded yet, starting with fallback`);
            // Play generated sound immediately as fallback
            this.playGeneratedSound(soundName);
            
            // Try to load and switch to file audio in background
            this.loadAudioFile(soundName).then(() => {
                if (sound.playing && sound.loaded) {
                    // Stop generated sound and switch to file
                    this.stopGeneratedAudio(soundName);
                    this.startFileAudio(soundName);
                }
            }).catch(() => {
                console.log(`Keeping fallback for ${soundName}`);
            });
            return;
        }
        
        // Load the file if not already loaded (for local files)
        if (!sound.loaded) {
            await this.loadAudioFile(soundName);
        }

        // If still not loaded (file doesn't exist), try generated fallback
        if (!sound.loaded && sound.type === 'file') {
            console.log(`File not available for ${soundName}, trying generated sound`);
            this.playGeneratedSound(soundName);
            return;
        }

        this.startFileAudio(soundName);
    }
    
    startFileAudio(soundName) {
        const sound = this.sounds.get(soundName);
        if (sound.audioBuffer) {
            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            
            source.buffer = sound.audioBuffer;
            source.loop = true; // Loop the audio file
            
            gainNode.gain.setValueAtTime(sound.volume, this.audioContext.currentTime);
            
            source.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            source.start();
            
            // Don't set playing = true here, it's already set in playSound()
            sound.gainNode = gainNode;
            this.soundSources.set(soundName, source);
        }
    }
    
    stopGeneratedAudio(soundName) {
        const sound = this.sounds.get(soundName);
        try {
            if (sound.source) {
                sound.source.stop();
                sound.source.disconnect();
                sound.source = null;
            }
            if (sound.lfo) {
                sound.lfo.stop();
                sound.lfo.disconnect();
                sound.lfo = null;
            }
            if (sound.gainNode) {
                sound.gainNode.disconnect();
                sound.gainNode = null;
            }
        } catch (error) {
            console.warn('Error stopping generated audio:', error);
        }
    }

    playGeneratedSound(soundName) {
        // Keep existing generated sound methods for fallbacks
        const generators = {
            // Cozy & Chill sounds
            'happy-panda': () => this.generateWhiteNoise(),
            'sleepy-bunny': () => this.generatePinkNoise(),
            'lemon-drop': () => this.generateBrownNoise(),
            'dreamy-fox': () => this.generateVioletNoise(),
            'fluffy-blanket': () => this.generatePinkNoise(),
            'cinnamon-toast': () => this.generateBrownNoise(),
            
            // Legacy noise mappings (for backward compatibility)
            'white-noise': () => this.generateWhiteNoise(),
            'pink-noise': () => this.generatePinkNoise(),
            'brown-noise': () => this.generateBrownNoise(),
            'violet-noise': () => this.generateVioletNoise(),
            
            // Playful & Energetic sounds (fallback to generated)
            'bouncy-squirrel': () => this.generateCafeSound(),
            'jellybean-jump': () => this.generateFireplaceSound(),
            'sprinkles-dance': () => this.generateLibrarySound(),
            'giggle-goose': () => this.generateBirdsSound(),
            'rainbow-hamster': () => this.generateCafeSound(),
            'cherry-pop': () => this.generateFireplaceSound(),
            
            // Legacy sound mappings (for backward compatibility)
            'cafe': () => this.generateCafeSound(),
            'fireplace': () => this.generateFireplaceSound(),
            'library': () => this.generateLibrarySound(),
            'fan': () => this.generateFanSound(),
            'train': () => this.generateTrainSound()
        };

        const generator = generators[soundName];
        if (!generator) return;

        const sound = this.sounds.get(soundName);
        const { source, filter, lfo } = generator();
        const gainNode = this.audioContext.createGain();
        
        gainNode.gain.setValueAtTime(sound.volume, this.audioContext.currentTime);
        
        if (filter) {
            filter.connect(gainNode);
        } else {
            source.connect(gainNode);
        }
        
        gainNode.connect(this.masterGain);
        
        source.start();
        if (lfo) lfo.start();
        
        // Don't set playing = true here, it's already set in playSound()
        sound.gainNode = gainNode;
        sound.source = source;
        sound.lfo = lfo;
    }

    stopSound(soundName) {
        if (!this.sounds.has(soundName)) return;

        const sound = this.sounds.get(soundName);
        if (!sound.playing) return;

        // Set playing state to false immediately for UI responsiveness
        sound.playing = false;

        try {
            // Stop file-based audio
            const source = this.soundSources.get(soundName);
            if (source) {
                source.stop();
                source.disconnect();
                this.soundSources.delete(soundName);
            }

            // Stop generated audio
            if (sound.source) {
                sound.source.stop();
                sound.source.disconnect();
                sound.source = null;
            }
            if (sound.lfo) {
                sound.lfo.stop();
                sound.lfo.disconnect();
                sound.lfo = null;
            }
            
            // Clean up gain node
            if (sound.gainNode) {
                sound.gainNode.disconnect();
                sound.gainNode = null;
            }
            
        } catch (error) {
            console.warn('Error stopping sound:', error);
            // Force reset the sound state even if there's an error
            sound.gainNode = null;
            sound.source = null;
            sound.lfo = null;
            this.soundSources.delete(soundName);
        }
    }

    setVolume(soundName, volume) {
        if (!this.sounds.has(soundName)) {
            console.warn(`Sound ${soundName} not found`);
            return;
        }

        const sound = this.sounds.get(soundName);
        sound.volume = Math.max(0, Math.min(1, volume));
        
        if (sound.gainNode && this.audioContext) {
            try {
                sound.gainNode.gain.setValueAtTime(sound.volume, this.audioContext.currentTime);
                console.log(`Volume set for ${soundName}: ${sound.volume}`);
            } catch (error) {
                console.warn(`Error setting volume for ${soundName}:`, error);
            }
        }
    }

    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        if (this.masterGain && this.audioContext) {
            try {
                this.masterGain.gain.setValueAtTime(this.masterVolume, this.audioContext.currentTime);
                console.log(`Master volume set to: ${this.masterVolume}`);
            } catch (error) {
                console.warn('Error setting master volume:', error);
            }
        }
    }

    stopAllSounds() {
        // Stop all individual sounds
        this.sounds.forEach((sound, name) => {
            if (sound.playing) {
                this.stopSound(name);
            }
        });
        
        // Clear all tracking maps as a safety measure
        this.soundSources.clear();
        
        // Reset all sound states
        this.sounds.forEach(sound => {
            sound.playing = false;
            sound.gainNode = null;
            sound.source = null;
            sound.lfo = null;
        });
    }

    isPlaying(soundName) {
        return this.sounds.has(soundName) ? this.sounds.get(soundName).playing : false;
    }

    // Additional generator methods for new sounds
    generateVioletNoise() {
        const bufferSize = this.audioContext.sampleRate * 2;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const violetNoise = this.audioContext.createBufferSource();
        violetNoise.buffer = noiseBuffer;
        violetNoise.loop = true;

        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, this.audioContext.currentTime);
        filter.Q.setValueAtTime(0.5, this.audioContext.currentTime);

        violetNoise.connect(filter);
        return { source: violetNoise, filter: filter };
    }

    generateFanSound() {
        const bufferSize = this.audioContext.sampleRate * 3;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.05 * white)) / 1.05;
            lastOut = output[i];
            output[i] *= 2;
        }

        const fanNoise = this.audioContext.createBufferSource();
        fanNoise.buffer = noiseBuffer;
        fanNoise.loop = true;

        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(120, this.audioContext.currentTime);
        filter.Q.setValueAtTime(2, this.audioContext.currentTime);

        fanNoise.connect(filter);
        return { source: fanNoise, filter: filter };
    }

    generateTrainSound() {
        const bufferSize = this.audioContext.sampleRate * 6;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.01 * white)) / 1.01;
            lastOut = output[i];
            output[i] *= 1.5;
            
            // Add rhythmic train sounds
            const rhythm = Math.sin(i * 0.001) * 0.2;
            output[i] = output[i] * (1 + rhythm);
        }

        const trainNoise = this.audioContext.createBufferSource();
        trainNoise.buffer = noiseBuffer;
        trainNoise.loop = true;

        return { source: trainNoise };
    }

    // Keep existing generator methods...
    generateRainSound() {
        const bufferSize = this.audioContext.sampleRate * 2;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.audioContext.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, this.audioContext.currentTime);
        filter.Q.setValueAtTime(0.5, this.audioContext.currentTime);

        whiteNoise.connect(filter);
        return { source: whiteNoise, filter: filter };
    }

    generateForestSound() {
        const bufferSize = this.audioContext.sampleRate * 4;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5;
        }

        const brownNoise = this.audioContext.createBufferSource();
        brownNoise.buffer = noiseBuffer;
        brownNoise.loop = true;

        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, this.audioContext.currentTime);

        brownNoise.connect(filter);
        return { source: brownNoise, filter: filter };
    }

    generateOceanSound() {
        const bufferSize = this.audioContext.sampleRate * 8;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.01 * white)) / 1.01;
            lastOut = output[i];
            output[i] *= 2;
            
            const wave = Math.sin(i * 0.0001) * 0.3;
            output[i] = output[i] * (1 + wave);
        }

        const oceanNoise = this.audioContext.createBufferSource();
        oceanNoise.buffer = noiseBuffer;
        oceanNoise.loop = true;

        return { source: oceanNoise };
    }

    generateBirdsSound() {
        const oscillator = this.audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        
        const lfo = this.audioContext.createOscillator();
        lfo.type = 'triangle';
        lfo.frequency.setValueAtTime(0.1, this.audioContext.currentTime);
        
        const modGain = this.audioContext.createGain();
        modGain.gain.setValueAtTime(100, this.audioContext.currentTime);
        
        lfo.connect(modGain);
        modGain.connect(oscillator.frequency);

        return { source: oscillator, lfo: lfo };
    }

    generateWhiteNoise() {
        const bufferSize = this.audioContext.sampleRate * 2;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.audioContext.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        return { source: whiteNoise };
    }

    generatePinkNoise() {
        const bufferSize = this.audioContext.sampleRate * 2;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.11;
            b6 = white * 0.115926;
        }

        const pinkNoise = this.audioContext.createBufferSource();
        pinkNoise.buffer = noiseBuffer;
        pinkNoise.loop = true;

        return { source: pinkNoise };
    }

    generateBrownNoise() {
        const bufferSize = this.audioContext.sampleRate * 2;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5;
        }

        const brownNoise = this.audioContext.createBufferSource();
        brownNoise.buffer = noiseBuffer;
        brownNoise.loop = true;

        return { source: brownNoise };
    }

    generateCafeSound() {
        const bufferSize = this.audioContext.sampleRate * 4;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            output[i] = (b0 + b1 + b2) * 0.3;
        }

        const cafeNoise = this.audioContext.createBufferSource();
        cafeNoise.buffer = noiseBuffer;
        cafeNoise.loop = true;

        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, this.audioContext.currentTime);
        filter.Q.setValueAtTime(1, this.audioContext.currentTime);

        cafeNoise.connect(filter);
        return { source: cafeNoise, filter: filter };
    }

    generateFireplaceSound() {
        const bufferSize = this.audioContext.sampleRate * 3;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.005 * white)) / 1.005;
            lastOut = output[i];
            output[i] *= 5;
            
            if (Math.random() < 0.001) {
                output[i] += (Math.random() - 0.5) * 0.5;
            }
        }

        const fireNoise = this.audioContext.createBufferSource();
        fireNoise.buffer = noiseBuffer;
        fireNoise.loop = true;

        return { source: fireNoise };
    }

    generateLibrarySound() {
        const bufferSize = this.audioContext.sampleRate * 6;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * 0.1;
            
            if (Math.random() < 0.0001) {
                output[i] += (Math.random() - 0.5) * 0.05;
            }
        }

        const libraryNoise = this.audioContext.createBufferSource();
        libraryNoise.buffer = noiseBuffer;
        libraryNoise.loop = true;

        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, this.audioContext.currentTime);

        libraryNoise.connect(filter);
        return { source: libraryNoise, filter: filter };
    }

    // Get sound status for UI updates
    getSoundStatus() {
        const status = {};
        this.sounds.forEach((sound, name) => {
            status[name] = {
                playing: sound.playing,
                loaded: sound.loaded,
                type: sound.type,
                volume: sound.volume
            };
        });
        return status;
    }
}

// Initialize the timer when the page loads
let timer;
document.addEventListener('DOMContentLoaded', () => {
    timer = new ZomodoroTimer();
});

// Make timer globally available for onclick handlers
window.timer = timer;