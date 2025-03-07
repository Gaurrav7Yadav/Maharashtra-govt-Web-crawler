# Maharashtra Govt. Web Crawler

## 📌 Overview

The **Maharashtra Govt. Web Crawler** is a full-stack web application that automates the process of downloading multiple **Index2** documents from the official government website [igrmaharashtra.gov.in](https://igrmaharashtra.gov.in). These documents are essential for legal and financial data extraction, making the automation process crucial for efficiency and accuracy.

## 🚀 Features

- **Automated Data Retrieval:** Fetches multiple **Index2** documents based on user input.
- **Custom Search Parameters:** Users can specify district, taluka, village, document number, and year.
- **Batch Downloading:** Supports downloading multiple documents in one go.
- **Data Storage:** Saves downloaded documents in an organized manner.
- **Error Handling:** Includes retry mechanisms for failed downloads.
- **User-Friendly UI:** Simple and intuitive interface for seamless operation.

## 🏗️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python (Flask/Django)
- **Web Scraping:** BeautifulSoup, Selenium
- **Database:** PostgreSQL / MySQL
- **Storage:** Local / Cloud (AWS S3, Google Drive Integration)

## 🔧 Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Python 3.x
- Pip
- Virtualenv (optional but recommended)
- WebDriver (Chrome/Firefox for Selenium)

### Automated Setup Script (Bash)

Create a file named `setup.sh` and paste the following code:

```bash
#!/bin/bash

# Clone the Repository
echo "Cloning Repository..."
git clone https://github.com/Gaurrav7Yadav/Govt.-Web-Crawler.git
cd Govt.-Web-Crawler || exit

# Create Virtual Environment
echo "Setting up Virtual Environment..."
python3 -m venv venv
source venv/bin/activate

# Install Dependencies
echo "Installing Dependencies..."
pip install -r requirements.txt

# Download WebDriver
echo "Ensure you have Chrome/Firefox WebDriver installed"

# Run the Application
echo "Starting Application..."
python app.py

# Access the UI
echo "Open http://127.0.0.1:5000 in your browser."
