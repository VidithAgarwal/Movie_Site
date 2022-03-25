import React, { useState, useEffect } from 'react'
import axios from 'axios';
const Banner = () => {

    const [movies, setMovies] = useState({});

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=848807771bfe0fa93c08ce9a319c4a32&page=1').then((res) =>
            setMovies(res.data.results[0])
        )
    }, [])

    return (
        <>
            <div className={`bg-[url(https://image.tmdb.org/t/p/original/${movies.backdrop_path})] h-[50vh] md:h-[80vh] bg-center bg-cover flex items-end justify-center bg-fixed
    `}>
                <div className='text-xl md:text-2xl text-white p-4 bg-gray-900 w-full rounded-xl flex justify-center bg-opacity-50 font-bold'>{movies.title || movies.name}</div>
            </div>

        </>
    )
}

export default Banner