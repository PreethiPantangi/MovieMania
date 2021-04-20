import './profile.css'
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserDetails } from '../../redux'
import { getImageUrl } from '../../redux/endpoints';
import { Link } from 'react-router-dom'
import noMovieImage from '../../noimg.png'
import CircularProgress from '@material-ui/core/CircularProgress';


function ProfileComponent({ getUserDetails, favMovies, tvShows, favMoviesLoading, tvMoviesLoading, loading }) {


    useEffect(() => {
        getUserDetails();
    }, [getUserDetails])

    return (
        <div className="profile_component" >
            <div className="favMovies_profile_component">
                <h4>Your favourite movies</h4>
                <div>
                    {!favMoviesLoading && favMovies && favMovies.results &&
                        <div className="favMovies">
                            {favMovies && favMovies.results && favMovies.results.map(favMovie =>
                                <Link key={favMovie.id} to={`/movie/${favMovie.id}`} >
                                    {favMovie.poster_path ?
                                        <img className="profile_fav_show_images" src={getImageUrl('500', favMovie.poster_path)} alt={favMovie.original_title} style={{ width: 250, height: 300 }} />
                                        : <img className="showinfo_image" src={noMovieImage} alt={favMovie.original_title} style={{ width: 250, height: 300 }} />}

                                    <p className="center-text" >{favMovie.original_title}</p>
                                </Link>
                            )}
                            {favMovies && favMovies.results && favMovies.results.length === 0 ? <h6>No favourite movies!</h6> : null}
                        </div>
                    }
                    {favMoviesLoading ? <div className="" >
                        <CircularProgress />
                    </div> : null}
                </div>
            </div>
            <div className="favMovies_profile_component">
                <h4>Your favourite Tv shows</h4>
                <div>
                    {!tvMoviesLoading && tvShows && tvShows.results && <div className="favMovies">
                        {tvShows && tvShows.results && tvShows.results.map(tvShow =>
                            <Link key={tvShow.id} to={`/tv/${tvShow.id}`} >
                                {tvShow.poster_path ?
                                    <img className="profile_fav_show_images" src={getImageUrl('500', tvShow.poster_path)} alt={tvShow.original_name} style={{ width: 250, height: 300 }} />
                                    : <img className="showinfo_image" src={noMovieImage} alt={tvShow.original_name} style={{ width: 250, height: 300 }} />}
                                <p className="center-text" >{tvShow.original_name}</p>
                            </Link>
                        )}
                        {tvShows && tvShows.results && tvShows.results.length === 0 ? <h6>No favourite tv shows!</h6> : null}
                    </div>}
                    {tvMoviesLoading ? <div className="" >
                        <CircularProgress />
                    </div> : null}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile.profile,
        favMovies: state.profile.favMovies,
        tvShows: state.profile.tvShows,
        favMoviesLoading: state.profile.favMoviesLoading,
        tvMoviesLoading: state.profile.tvMoviesLoading,
        loading: state.profile.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserDetails: () => {
            dispatch(getUserDetails())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);