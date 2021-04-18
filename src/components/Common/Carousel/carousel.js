import React from 'react';
import { Link } from 'react-router-dom';
import './carousel.css'

function Carousel(props) {
    return (
        <div className="carousel_component">
            {props.data && props.data.map(genre =>
                <div key={genre.id} className="carousel_item" >
                    <Link key={genre.id} to={`/${props.type}/${genre.id}/${genre.name}`} >
                        <img className="carousel_image" src={genre.poster_path} alt={genre.name} style={{ width: 200, height: 130 }} />
                        <p className="center-text" key={genre.id} >{genre.name}</p>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Carousel;