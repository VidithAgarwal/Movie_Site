import React, { useState, useEffect } from 'react'
import Pagination from './Pagination';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


const Movies = () => {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [hover, setHover] = useState('');
    const [favourites, setFavourites] = useState([]);

    let [pageNumber, setPageNumber] = useState(1);

    let add = (movie) => {
        let newArray = [...favourites, movie];
        setFavourites([...newArray]);
        localStorage.setItem('imdb', JSON.stringify(newArray));
    }

    let del = (movie) => {
        let newArray = favourites.filter(m => m.id !== movie.id);
        setFavourites([...newArray]);
        localStorage.setItem('imdb', JSON.stringify(newArray));
    }

    const goAhead = () => {
        setPageNumber(pageNumber + 1);
    }

    const goBack = () => {
        if (pageNumber > 1)
            setPageNumber(pageNumber - 1);
    }

    const redirectPage = (type, id) => {
        navigate(`/${type}/${id}`);
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=848807771bfe0fa93c08ce9a319c4a32&page=${pageNumber}}`).then((res) => {

            setMovies(res.data.results)
            let oldFav = localStorage.getItem('imdb');
            oldFav = JSON.parse(oldFav) || [];
            setFavourites([...oldFav]);
        })
    }, [pageNumber])




    return (
        <>
            <div className='mb-8'>
                <div className='mt-8 font-bold text-2xl text-center mb-8'>Trending Movies</div>
                {
                    movies.length === 0 ?
                        <div className='flex justify-center'>
                            <Oval
                                height="50"
                                width="50"
                                color='grey'
                                ariaLabel='loading'
                            />
                        </div>
                        :

                        <div className='flex flex-wrap justify-center'>
                            {
                                movies.map((movie, key) =>
                                (<div key={key} className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path || movie.poster_path})] h-[25vh] w-[150px] md:h-[30vh] md:w-[250px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 relative`}
                                    onMouseEnter={() => setHover(movie.id)}
                                    onMouseLeave={() => setHover('')}

                                >
                                    {
                                        hover === movie.id && <>{!favourites.find((m) =>
                                            m.id === movie.id) ? <div className='absolute bg-gray-800  top-2 right-2 p-2
                                        text-xl rounded-xl cursor-pointer'
                                                onClick={() => add(movie)}>😍</div> : <div className='absolute bg-gray-800  top-2 right-2 p-2
                                            text-xl rounded-xl cursor-pointer'
                                                    onClick={() => del(movie)}>❌</div>
                                        }

                                        </>
                                    }


                                    <div onClick={() => redirectPage(movie.media_type, movie.id)} className='bg-gray-900 w-full py-2 text-white text-center rounded-b-xl font-bold  cursor-pointer'>{movie.title || movie.name} </div>
                                </div>)
                                )
                            }
                        </div>}
            </div>
            <Pagination pageNumber={pageNumber} goBack={goBack} goAhead={goAhead} />
        </>
    )
}

export default Movies;