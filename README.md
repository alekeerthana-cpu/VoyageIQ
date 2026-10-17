# ✈️ VoyageIQ – AI-Powered Travel Intelligence Platform

**Discover India. Plan Smarter. Travel Better.**

VoyageIQ is an AI-powered travel discovery and trip-planning platform designed to help travelers explore destinations across India, discover hidden gems, create personalized itineraries, estimate travel budgets, and visualize destinations using interactive maps.

The platform combines web technologies, Python-based recommendation logic, Google Maps integration, and MySQL to provide a smarter and more personalized travel-planning experience.

## 🌟 Features

- 🇮🇳 **Explore India:** Discover destinations across all 28 states and 8 Union Territories.
- 🔍 **Smart Destination Search:** Search for destinations by name, location, or category.
- 🏛️ **Explore Categories:** Find temples, beaches, waterfalls, forts, mountains, historical places, and hidden gems.
- 🗺️ **Interactive Maps:** View destinations, location details, and nearby attractions using Google Maps.
- 📸 **Destination Photos:** Display destination photographs using the Google Places API, with attribution where required.
- 🤖 **Personalized Recommendations:** Discover places based on interests, budget, and travel preferences.
- 🧳 **Trip Planner:** Plan trips with travel dates, duration, starting location, destinations, and traveler count.
- 📅 **Day-Wise Itinerary:** Organize destinations and activities into a practical travel schedule.
- 💰 **Budget Estimation:** Estimate travel expenses based on trip details and budget preferences.
- ❤️ **Favorites and Saved Trips:** Save destinations and organize travel plans.
- 📊 **Travel Analytics Dashboard:** Visualize trip budgets, travel preferences, and destination insights.
- 📱 **Responsive Design:** Access the platform on desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

| Component | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python, Flask |
| Database | MySQL |
| Maps and Places | Google Maps Platform, Google Places API |
| Data Analysis | Pandas, NumPy |
| Charts | Chart.js |
| Development Tools | Visual Studio Code, MySQL Workbench, Git, GitHub |

## 📁 Project Structure

```text
VoyageIQ/
├── app.py
├── config.py
├── requirements.txt
├── .env
├── .gitignore
├── routes/
├── services/
├── database/
│   ├── connection.py
│   └── schema.sql
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── explore.html
│   ├── destination.html
│   ├── planner.html
│   ├── itinerary.html
│   ├── analytics.html
│   ├── wishlist.html
│   ├── login.html
│   └── register.html
├── static/
│   ├── css/
│   ├── js/
│   └── images/
├── data/
└── tests/
```

*Note: The folders and files above represent the planned project structure. Some components may be added as development progresses.*

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/VoyageIQ.git
cd VoyageIQ
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Create a virtual environment

```bash
python -m venv .venv
```

Activate it on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
python -m pip install -r requirements.txt
```

### 4. Configure environment variables

Create a local `.env` file and configure the required database credentials and API keys.

Example:

```env
SECRET_KEY=replace-with-a-secure-random-value
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=voyageiq
GOOGLE_MAPS_API_KEY=your_api_key
```

Use the environment variable names expected by your application. Never commit real passwords, secret keys, or private API keys to GitHub.

### 5. Set up MySQL

1. Open MySQL Workbench.
2. Create a database named `voyageiq`.
3. Configure the database connection in your project.
4. Execute your database schema when it is ready.

### 6. Run the Flask application

```bash
python app.py
```

Open the local address printed in your terminal, commonly:

```text
http://127.0.0.1:5000
```

## 🔑 Google Maps API Configuration

VoyageIQ uses Google Maps Platform services for map visualization, destination discovery, and place photographs.

To configure the integration:

1. Create a project in Google Cloud Console.
2. Enable the required Maps and Places APIs.
3. Configure billing and usage limits.
4. Restrict API keys to the appropriate websites or server applications.
5. Follow Google's attribution, data-use, and photo-display requirements.

Google API usage may incur charges. Check the current pricing and terms before enabling paid services.

## 🧠 Recommendation System

VoyageIQ is designed to recommend destinations using factors such as:

- Travel budget
- Personal interests
- Trip duration
- Travel preferences
- Destination characteristics

The recommendation engine can rank destinations using a weighted scoring approach. The weights will be refined and evaluated as the project develops.

## 🚀 Future Enhancements

- Advanced AI-powered itinerary generation
- Weather-aware destination recommendations
- Route optimization and travel-time estimation
- More detailed accommodation and transport estimates
- User reviews and destination ratings
- Interactive travel reports and insights
- Deployment as a publicly accessible web application

## 🎯 Project Objective

The primary objective of VoyageIQ is to make travel planning more convenient, personalized, and data-driven by bringing destination discovery, itinerary planning, budgeting, maps, and travel analytics into a single platform.

## 👩‍💻 Developed By

**Keerthana**  
B.Tech – Computer Science and Engineering (Data Science)

VoyageIQ is a college project developed to explore web development, data analytics, recommendation systems, database management, and travel technology.

## 📄 License

This project is intended for educational and portfolio purposes. An open-source license can be added when the repository's licensing terms are finalized.
