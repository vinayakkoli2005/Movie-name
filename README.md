🎬 Movie Search & Trending App

A React-based movie discovery app that allows users to search for movies, view trending movies, and track search term popularity using Appwrite as a backend database.

The app integrates with The Movie Database (TMDB) API for fetching movie details and uses Appwrite to log search analytics.

🚀 Features

🔍 Search Movies – Search any movie by name (debounced to avoid extra API calls).

📈 Track Search Terms – Each search term is logged in Appwrite with a count of how many times it’s searched.

🎥 Trending Movies – Displays trending movies based on search popularity (fetched from Appwrite).

⚡ Fast & Responsive – Uses react-use debounce and a loading spinner for smooth UX.

🎨 Modern UI – Styled with Tailwind CSS.

🛠️ Tech Stack

Frontend: React, Tailwind CSS

Backend / Database: Appwrite

API: TMDB API

Other: react-use for debounce

📂 Project Structure
├── src
│   ├── components
│   │   ├── Search.jsx       # Search bar input
│   │   ├── Spinner.jsx      # Loading spinner
│   │   ├── MovieCard.jsx    # Movie card display
│   ├── App.jsx              # Main application
│   ├── appwrite.js          # Appwrite SDK setup & helpers
│   └── index.css            # Tailwind styles
├── public
│   └── hero.png             # Header hero image
├── .env                     # API keys & Appwrite config
└── README.md

⚙️ Setup & Installation
1️⃣ Clone Repo
git clone https://github.com/your-username/movie-search-app.git
cd movie-search-app

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file in the root with:

# TMDB API
VITE_TMDM_API_KEY=your_tmdb_api_key_here

# Appwrite
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_DATABASE_ID=your_collection_id


                                                      

4️⃣ Run App
npm run dev


The app should now be live on http://localhost:5173.

📊 Appwrite Collection Schema

Make sure your Appwrite collection (for search analytics) has the following fields:

Field	Type	Example
searchTerm	String	"Inception"
count	Integer	5
movie_id	String	12345
poster_url	String	https://.../poster.jpg
🖼️ Screenshots
🔍 Search Page

(Insert screenshot here)

📈 Trending Movies

(Insert screenshot here)

📌 Future Improvements

To be able to watch movies using different Apis

 Add authentication for personalized history

 Store user favorites

 Infinite scroll for movies                    
  

 Dark mode
