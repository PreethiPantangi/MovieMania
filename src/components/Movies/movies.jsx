import React from 'react';
import './movies.css'
import GenresComponent from '../Common/Genre/genre'
import CategoriesComponent from '../Common/Categories/categories'

function MoviesComponent() {

    return (
        <React.Fragment>
            <div className="genres">
                <GenresComponent type="movie" />
            </div>
            <div className="categories">
                <CategoriesComponent type="movie" category='now_playing' title='Now Playing' />
            </div>
            <div className="categories">
                <CategoriesComponent type="movie" category='popular' title='Popular' />
            </div>
            <div className="categories">
                <CategoriesComponent type="movie" category='upcoming' title='Up coming' />
            </div>
            <div className="categories">
                <CategoriesComponent type="movie" category='top_rated' title='Top Rated' />
            </div>
        </React.Fragment>
    );
}

export default MoviesComponent;