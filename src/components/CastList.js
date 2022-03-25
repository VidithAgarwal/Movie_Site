import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './MoviePage.css'

const CastList = ({ id }) => {

    const { type } = useParams();

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=848807771bfe0fa93c08ce9a319c4a32&language=en-US`)
            .then((res) => {
                setCasts(res.data.cast.slice(0, 5));
            })
    }, [type, id]);


    return (
        <div className="casts">
            {
                casts.map((item, i) => (
                    <div key={i} className="item">
                        <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${item.profile_path})] cast_img`}></div>
                        <p className="cast_name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CastList