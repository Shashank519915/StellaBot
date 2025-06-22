#ProjectStellaBot v2.0

# 🤖 Project Stella Bot

<div align="center">

[![Project Stella Bot Logo](https://img.shields.io/badge/Stella-Bot-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/aGhuvYMDvD)

**A Feature-Rich Discord Bot with Journal System & Smart Utilities**

[![Discord.js](https://img.shields.io/badge/Discord.js-14.x-5865F2?style=flat-square&logo=discord&logoColor=white)](https://discord.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white)](https://render.com/)

[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

[![Bot Status](https://img.shields.io/badge/Status-Online-success?style=flat-square)](https://discord.gg/aGhuvYMDvD)
[![Version](https://img.shields.io/badge/Version-2.0-brightgreen?style=flat-square)](https://github.com/yourusername/stella-bot/releases)
[![Uptime](https://img.shields.io/badge/Uptime-99.9%25-brightgreen?style=flat-square)]()

[**📋 Features**](#-features) • 
[**🚀 Quick Start**](#-quick-start) • 
[**📖 Commands**](#-commands) • 
[**🛠️ Installation**](#️-installation) • 
[**📚 API Reference**](#-api-reference)

</div>

---

## ✨ Features

### 📔 **Advanced Journal System**
- **Personal Journaling**: Save daily thoughts with automatic timestamping
- **Grammar Correction**: Powered by TextGears API for intelligent text improvement  
- **Smart Navigation**: Browse entries with paginated display (5 per page)
- **Entry Management**: Edit, delete, and organize your journal seamlessly
- **Secure Storage**: MongoDB Atlas integration for reliable data persistence

### 🌤️ **Weather Intelligence** 
- **Real-time Forecasts**: Current weather conditions for any global location
- **Smart Emojis**: Dynamic weather icons based on conditions
- **Temperature Display**: Celsius format with detailed descriptions
- **Location Validation**: Secure input handling with format checking

### 🎮 **Interactive Entertainment**
- **Trivia Challenges**: 15-second timed questions from Open Trivia Database
- **Random Jokes**: Family-friendly humor from JokeAPI
- **Social Greetings**: Customizable welcome messages with user mentions

### 🔧 **Utility Commands**
- **Comprehensive Help**: Detailed command documentation with examples
- **Mention Responses**: Smart bot interaction when tagged
- **Error Handling**: Robust error management with user-friendly messages

---

## 🏗️ Tech Stack

<div align="center">

### **Backend & Core**
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.js.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

### **Database & Storage**
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

### **External APIs**
[![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-FFA500?style=for-the-badge&logo=openweathermap&logoColor=white)](https://openweathermap.org/)
[![TextGears](https://img.shields.io/badge/TextGears-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://textgears.com/)
[![JokeAPI](https://img.shields.io/badge/JokeAPI-FF6B6B?style=for-the-badge&logo=api&logoColor=white)](https://jokeapi.dev/)
[![Open Trivia DB](https://img.shields.io/badge/Open%20Trivia%20DB-4ECDC4?style=for-the-badge&logo=trivia&logoColor=white)](https://opentdb.com/)

### **HTTP & Networking**
[![Node-Fetch](https://img.shields.io/badge/Node--Fetch-000000?style=for-the-badge&logo=node.js&logoColor=white)](https://www.npmjs.com/package/node-fetch)

### **Hosting & Deployment**
[![Hosted on Render](https://img.shields.io/badge/Hosted%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

</div>

---

## 🚀 Quick Start

### **Join Our Production Discord Server**
[**🎯 Join and use Project Stella Bot in this Server**](https://discord.gg/aGhuvYMDvD)

### **Try These Commands:**
1. `!help` - Get familiar with all features
2. `!journal Hello Stella!` - Create your first journal entry  
3. `!weather your-city` - Check your local weather
4. `!trivia` - Test your knowledge

---

### **Bot status on Uptime Robot**
Uptime Keep-Alive: An Express-based keep-alive route ensures the bot stays live on Render.

---

## 📖 Commands

<div align="center">

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `!journal [entry]` | 📝 Save daily thoughts with grammar check | `!journal Today was amazing!` |
| `!showall` | 📚 View paginated journal history | `!showall` |
| `!delete` | 🗑️ Navigate and remove journal entries | `!delete` |
| `!weather [location]` | 🌤️ Get real-time weather forecasts | `!weather London` |
| `!trivia` | 🧠 Answer timed trivia questions | `!trivia` |
| `!joke` | 😂 Get random family-friendly jokes | `!joke` |
| `!greet @user` | 👋 Send personalized greetings | `!greet @username` |
| `!help` | ❓ Display detailed command guide | `!help` |

</div>

### 🔍 **Command Details**

#### **Journal System Commands**
```bash
# Save a new journal entry
!journal Today I learned something new about JavaScript closures.

# View all your entries (paginated)
!showall

# Delete entries with navigation
!delete
```

#### **Utility Commands**
```bash
# Get weather for any city
!weather New York
!weather Tokyo, Japan

# Start a trivia challenge
!trivia

# Get a random joke
!joke

# Greet another user
!greet @username
```

---



---

## 🛠️ Installation

### **Prerequisites**
- **Node.js** 18.x or higher
- **MongoDB Atlas** account
- **Discord Bot Token**
- **API Keys** (OpenWeatherMap, TextGears)

### **1. Clone Repository**
```bash
git clone https://github.com/Shashank519915/StellaBot.git
cd StellaBot
```

### **2. Install Dependencies**
```bash
npm install discord.js mongoose node-fetch express
```

### **3. Environment Setup**
Create `config.json` in the root directory:
```json
{
  "prefix": "!",
  "token": "YOUR_DISCORD_BOT_TOKEN",
  "weatherapikey": "YOUR_OPENWEATHERMAP_API_KEY", 
  "textgearapikey": "YOUR_TEXTGEARS_API_KEY",
  "mongoUri": "YOUR_MONGODB_CONNECTION_STRING"
}
```

### **4. Get API Keys**

#### **Discord Bot Token**
1. Visit [Discord Developer Portal](https://discord.com/developers/applications)
2. Create new application → Bot section
3. Copy token to `config.json`

#### **OpenWeatherMap API**
1. Register at [OpenWeatherMap](https://openweathermap.org/api)
2. Get free API key
3. Add to `config.json`

#### **TextGears API** 
1. Sign up at [RapidAPI TextGears](https://rapidapi.com/textgears/api/textgears/)
2. Subscribe to free plan
3. Copy API key to `config.json`

#### **MongoDB Atlas**
1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get connection string
3. Add to `config.json`

### **5. Launch Bot**
```bash
node bot.js
```

You should see:
```
🔗 Connecting to MongoDB...
✅ MongoDB Connected
🤖 Logging in to Discord...
🤖 Bot is ready!
```

---

## 📁 Project Structure

```
stella-bot/
├── 📄 bot.js                 # Main bot entry point
├── 📄 db.js                  # MongoDB connection & models
├── 📄 config.json            # Configuration file
├── 📁 Commands/
│   ├── 📄 journalCommand.js      # Journal system logic
│   ├── 📄 showallJournalCommand.js # Journal pagination  
│   ├── 📄 deleteCommand.js       # Entry deletion with navigation
│   ├── 📄 weatherCommand.js      # Weather API integration
│   ├── 📄 triviaCommand.js       # Trivia game mechanics
│   ├── 📄 jokeCommand.js         # Joke API integration
│   ├── 📄 greetCommand.js        # User greeting system
│   ├── 📄 helpCommand.js         # Help documentation
│   └── 📄 mentionCommand.js      # Bot mention responses
└── 📁 models/
    └── 📄 JournalEntry.js        # Journal entry schema
```

---

## 🔧 Configuration

### **Bot Permissions Required**
- `Send Messages`
- `Read Message History` 
- `Add Reactions`
- `Use External Emojis`
- `Embed Links`

### **MongoDB Schema**
```javascript
{
  userId: String,     // Discord user ID
  date: String,       // Entry date (formatted)
  time: String,       // Entry time (formatted)  
  content: String,    // Journal content (min 3 chars)
  timestamps: true    // Auto createdAt/updatedAt
}
```

---

## 📚 API Reference

### **Core Dependencies**
```json
{
  "discord.js": "^14.x",
  "mongoose": "^7.x",
  "express": "^5.x"
  "node-fetch": "^2.x"
}
```

### **External APIs Used**
- **OpenWeatherMap**: Weather data retrieval
- **TextGears**: Grammar correction service
- **JokeAPI**: Random joke generation  
- **Open Trivia Database**: Trivia questions

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Guidelines**
- Follow existing code style
- Add comments for complex logic
- Test all commands thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Discord.js** team for the excellent library
- **OpenWeatherMap** for reliable weather data
- **TextGears** for grammar correction services
- **JokeAPI** & **Open Trivia DB** for entertainment content

---

## 📞 Support

<div align="center">

**Need Help?**

[![Discord Server](https://img.shields.io/badge/Discord-Join%20Server-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/aGhuvYMDvD)
[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shashank519915/StellaBot/issues)

**Found a Bug?** [Report it here](https://github.com/Shashank519915/StellaBot/issues/new)  
**Feature Request?** [Suggest it here](https://github.com/Shashank519915/StellaBot/discussions)

</div>

---

<div align="center">

**Made with ❤️ by [Shashank Anand](https://github.com/Shashank519915)**  
<br>
<br>
[![Instagram Badge](https://img.shields.io/badge/-Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/shashankanand)
[![LinkedIn Badge](https://img.shields.io/badge/-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/shashank-anand)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:letshashankknow@gmail.com)


⭐ **Star this repo if you found it helpful!** ⭐

</div>
