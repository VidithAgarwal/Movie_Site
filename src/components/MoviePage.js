import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MoviePage.css';
import CastList from './CastList';

const MoviePage = () => {

    const { type, id } = useParams();

    const [movie, setMovie] = useState({});


    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=848807771bfe0fa93c08ce9a319c4a32&language=en-US`)
            .then(res => {
                setMovie(res.data);
            })
    }, [id, type])

    return (
        <>
            <div className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] bg_image`}>
                <div className='content mb-4'>
                    <div className='poster'>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' />
                    </div>
                    <div className='info'>
                        <h2 className='title'>{movie.original_title || movie.name}</h2>
                        <div className="genres">
                            {
                                movie.genres && movie.genres.slice(0, 5).map((genre, i) => (
                                    <span key={i} className="item">{genre.name}</span>
                                ))
                            }
                        </div>
                        <div className='overview'>{movie.overview}</div>
                        <div className="cast">
                            <div className="section__header">
                                <h1 className='font-bold'>Casts</h1>
                            </div>
                            <CastList id={movie.id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MoviePage