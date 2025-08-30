import React, {useEffect , useState} from 'react'
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import {MovieCard} from "./components/MovieCard.jsx";
import {useDebounce} from "react-use";
import {getTrendingMovies, updatesearchcnt} from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY= import.meta.env.VITE_TMDM_API_KEY;




const API_OPTIONS ={
    method:'GET',
    headers:{
        accept : 'application/json',
        Authorization:`Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [errorMessage,seterrorMessage]=useState('');

    const [movieList, setmovieList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    const [trendingMovies, setTrendingMovies] = useState([]);

    useDebounce(()=>setDebouncedSearchTerm(searchTerm),800,[searchTerm])

    const fetchMovies= async(query='')=>{

        setIsLoading(true);
        seterrorMessage('');

        try{
            const endpoint =query ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            // const endpoint = `${VIDSRC_BASE_URL}/movies/latest/page-1.json`;
            const response = await fetch (endpoint,API_OPTIONS);

            if(!response.ok){
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            console.log(data);


            if(data.Response=== "False"){
                seterrorMessage(data.Error || "Failed to fetch movies");
                setmovieList([]);
                return ;
            }

            setmovieList(data.results || []);

            if(query && data.results.length>0){
                await updatesearchcnt(query,data.results[0]);
            }


        }catch(error){
            console.error(`Error Fetching movies: ${error}`)
            seterrorMessage('`Error Fetching movies, Please try again')
        }finally {
            setIsLoading(false);
        }

    }

    const loadTrendingMovies= async ()=> {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        }catch (e) {
            console.log(e.message);
        }
    }
    useEffect(()=>{
        fetchMovies(debouncedSearchTerm);
    },  [debouncedSearchTerm] );

    useEffect(() => {
        loadTrendingMovies();
    }, []);

    return (
        <main>
            <div className='pattern'/>

            <div className="wrapper">
                <header>
                    <img src="/hero.png" />
                    <h1 className="text-3xl font-bold underline">
                        Find <span className="text-gradient">Movies</span> You'll Love
                    </h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </header>
            </div>
            {trendingMovies.length>0 && (
                <section className="trending">
                    <h2>Trending Movies</h2>
                    <ul>
                        {trendingMovies.map((movie,index)=>(
                            <li key = {movie.$id}>
                                <p>{index+1}</p>
                                <img src={movie.poster_url} alt={movie.title}/>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            <section className="all-movies">
                <h2>All Movies</h2>
                {isLoading ? (
                    <Spinner/>
                ) : errorMessage ? (
                    <p className="text-red-500">{errorMessage}</p>
                ) : movieList.length === 0 ? (
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">No movies found</p>
                ) :(
                    <ul>
                        {movieList.map((movie)=> (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </ul>
                )}
            </section>


            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
        </main>
    )
}
export default App
