import React from 'react';
import GenresComponent from '../Common/Genre/genre'
import CategoriesComponent from '../Common/Categories/categories'

function TvShowsComponent() {
    return (
        <React.Fragment>
            <div className="genres">
                <GenresComponent type="tv" />
            </div>
            <div className="categories">
                <CategoriesComponent type="tv" category='popular' title='Popular' />
            </div>
            <div className="categories">
                <CategoriesComponent type="tv" category='top_rated' title='Top Rated' />
            </div>
        </React.Fragment>
    );
}

export default TvShowsComponent;