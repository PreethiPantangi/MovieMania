import React, { useEffect, useState } from 'react';
import { getGenre } from '../../constants/genres'
import Carousel from '../Carousel/carousel'

function GenresComponent(props) {

    const [genres, setGenres] = useState([])

    useEffect(() => {
        if (props.type === 'movie') {
            setGenres(getGenre().movie)
        } else {
            setGenres(getGenre().tv)
        }
    }, [props])


    return (
        <React.Fragment>
            <h3>Genres</h3>
            <Carousel data={genres} type={props.type} />
        </React.Fragment>
    );
}

export default GenresComponent;