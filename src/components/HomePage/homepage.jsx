import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './homepage.css'
import MoviesComponent from '../Movies/movies'
import TvShowsComponent from '../TvShows/tvshows'
import LoginComponent from '../Login/login'
import ProfileComponent from '../Profile/profile'
import ShowsListComponent from '../Common/ShowsList/showslist'
import ShowInfoComponent from '../Common/ShowInfo/showinfo'

function HomePageComponent() {
    return (
        <div className="homepage_component" >
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={MoviesComponent} />
                    <Route exact path='/tvshows' component={TvShowsComponent} />
                    <Route exact path='/login' component={LoginComponent} />
                    <Route exact path='/profile' component={ProfileComponent} />
                    <Route exact path="/:type/:genreId/:genreName" component={ShowsListComponent} />
                    <Route exact path="/:type/:showId" component={ShowInfoComponent} />
                </Switch>
            </HashRouter>
        </div>
    );
}

export default HomePageComponent;