import React from 'react'

export const MovieCard = ({movie:{title,vote_average,poster_path
    ,release_date,original_language}}) => {
    return (
        <div className="movie-card">
            <img src={poster_path  ? `https://image.tmdb.org/t/p/w500${poster_path}`  : '/no-movie.png'} alt={title} className="w-40 rounded-lg" />

            <div className="mt-4">
                <div className="rating">
                    <img src="star.svg" alt="Star icon"/>
                    <p>{vote_average ? vote_average.toFixed(1):"N/A"}</p>

                    <span>•</span>
                    <p>{original_language}</p>

                    <span>•</span>
                    <p>{release_date ? release_date.split('-')[0]:'N/A'}</p>
                </div>

            </div>

        </div>




    )
}
