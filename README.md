# Cryptocurrency Trading Data Visualization App

This project is a web application for visualizing cryptocurrency trading data from various platforms.

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

This will install all required Node.js modules specified in `package.json`.

## Features

- Fetches real-time cryptocurrency data from WazirX API.
- Stores data in a SQLite database (`hodlinfo.db`).
- Provides a responsive web interface for viewing the data.
- Updates data every 60 seconds using AJAX requests.
- Calculates and displays statistical information such as best price, price changes, and savings.

## Technologies Used

- **Backend**: Node.js, Express.js, SQLite3
- **Frontend**: HTML, CSS, Bootstrap
- **API**: WazirX API for cryptocurrency data

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Hemanth-Kumar-K/QuadDb_Assignment.git
   cd QuadDb_Assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node app.js
   ```

4. Open your web browser and go to `http://localhost:3000` to view the application.

## Database Schema

The SQLite database (`hodlinfo.db`) consists of a single table `tickers` with the following schema:

```sql
CREATE TABLE IF NOT EXISTS tickers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    last REAL,
    buy REAL,
    sell REAL,
    volume REAL,
    base_unit TEXT
);
```

## Usage

- Access `/` endpoint to view the web interface with real-time data.
- Access `/tickers` endpoint to fetch JSON data of all tickers stored in the database.

## File Structure

```
├── app.js
├── public/
│   ├── index.html
│   └── styles.css
├── images/
│   └── profile.png
├── LICENSE
├── README.md
└── hodlinfo.db
```

## Contributors

- Hemanth hemanth22092003@gmail.com
