import './showinfo.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCreditsUrl, getImageUrl, getRecommendationsUrl, getShowDetailsUrl } from '../../../redux/endpoints'
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Male from '../../../male.png'
import Female from '../../../female.jpg'
import noMovieImage from '../../../noimg.png'
import { postFavShow, postMovieToWatchList } from '../../../redux/account/accountactions'
import CircularProgress from '@material-ui/core/CircularProgress';


function ShowInfoComponent({ authResponse, favMoviesList, favTvShows, postFavShow, postMovieToWatchList }) {


    const [showDetails, setShowDetails] = useState({})
    const [isFav, setIsFav] = useState(false);
    const [isreceivedShowDetails, setIsreceivedShowDetails] = useState(false);
    const [cast, setCast] = useState({});
    const [recommendations, setRecommendations] = useState({})

    let params = useParams();

    let type = params.type;

    // let movieList = []
    // favMoviesList.map(favMovie => {
    //     movieList.push(favMovie.id)
    // })
    // tvShows.map(favMovie => {
    //     movieList.push(favMovie.id)
    // })

    useEffect(() => {
        let showId = params.showId;

        if (authResponse.success) {
            if (favMoviesList && favMoviesList.length !== 0) {
                console.log(favMoviesList, favTvShows);
                favMoviesList.forEach(favMovie => {
                    if (parseInt(favMovie.id) === parseInt(showId)) {
                        setIsFav(true)
                    }
                });
            } else if (favTvShows && favTvShows.length !== 0) {
                console.log(favTvShows);
                favTvShows.forEach(tvShow => {
                    if (parseInt(tvShow.id) === parseInt(showId)) {
                        setIsFav(true)
                    }
                });
            }
        }

        axios.get('http://api.themoviedb.org/3/tv/60735/season/1?api_key=80ba168b92a6d9e727033838c5905b4b').then(res => {
            console.log(res.data);
        })
            .catch(err => {
                console.log(err);
            })

        axios.get(getShowDetailsUrl(type, showId))
            .then(res => {
                setShowDetails(res.data);
                axios.get(getCreditsUrl(type, showId)).then((res) => {
                    console.log('in credits & recc');
                    setCast(res.data.cast)
                    axios.get(getRecommendationsUrl(type, showId)).then((res) => {
                        setRecommendations(res.data.results);
                        setIsreceivedShowDetails(true)
                    })
                })
            })
            .catch(err => {
                // setIsreceivedShowDetails(err.response)
            })

    }, [params.showId, favMoviesList, favTvShows, authResponse, type])



    if (showDetails && isreceivedShowDetails) {
        let year = typeof showDetails.release_date === 'string' ? showDetails.release_date.split("-")[0] : "";
        let runtime = showDetails.runtime;
        var hours = Math.floor(runtime / 60);
        var minutes = Math.floor(runtime % 60);
        var formattedTime = hours + 'hr ' + minutes + 'm ';
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} >
                    {showDetails.poster_path ? <img className="showinfo_image" src={getImageUrl('500', showDetails.poster_path)} style={{ width: 300, height: 400 }} alt={showDetails.original_title} />
                        : <img className="showinfo_image" src={noMovieImage} style={{ width: 300, height: 400 }} alt={showDetails.original_title} />}

                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid item xs={12}>
                        {type === 'movie' ?
                            <h3 className="page_title">{showDetails.original_title}</h3> :
                            <h3 className="page_title">{showDetails.original_name}</h3>}
                    </Grid>
                    <Grid item xs={12}>
                        <h5>{showDetails.tagline}</h5>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6} sm={3}>
                            {type === 'movie' ? year :
                                <div>
                                    <div>Total Seasons</div>
                                    <div>
                                        {showDetails.number_of_seasons}
                                    </div>
                                </div>}
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            {type === 'movie' ? formattedTime :
                                <div>
                                    <div>Total episodes</div>
                                    <div>
                                        {showDetails.number_of_episodes}
                                    </div>
                                </div>
                            }
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            {showDetails.vote_average}<Rating readOnly name="customized-10" defaultValue={1} max={1} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <div className="showinfo_genres" >
                                {showDetails.genres ? showDetails.genres.map((genre) => <p key={genre.id} >{genre.name} | &nbsp;</p>) : null}
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <h3 className="page_title">Overview</h3>
                        <div>
                            {showDetails.overview}
                        </div>
                    </Grid>
                    &nbsp;
                    <Grid item xs={12} sm={12}>
                        {authResponse.success ?
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <h4 className="page_title">Your Rating</h4>
                                    <Rating name="customized-10" defaultValue={0} max={10} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button className="showinfo_grid_button" onClick={() => { postMovieToWatchList(type, params.showId, true); }} variant="outlined">Add to watchlist</Button>
                                </Grid>
                                <Grid item xs={4}>
                                    {isFav ?
                                        <Button className="showinfo_grid_button" onClick={() => { postFavShow(type, params.showId, false); setIsFav(false) }} variant="outlined">Remove from favourite</Button> :
                                        <Button className="showinfo_grid_button" onClick={() => { postFavShow(type, params.showId, true); setIsFav(true) }} variant="outlined">Add to favourite</Button>}
                                </Grid>
                            </Grid>
                            : null}

                    </Grid>
                </Grid>
                {type === 'tv' ?
                    <Grid item xs={12} sm={12} >
                        <h3 className="page_title">Seasons</h3>
                        {showDetails.seasons.length ?
                            <div className="cast_list" >
                                {showDetails.seasons.map((season) => (
                                    <div key={season.id} >
                                        {season.poster_path !== null ?
                                            <img className="showinfo_content" src={getImageUrl('500', season.poster_path)} alt={season.name} style={{ width: 150, height: 200 }} /> :
                                            <div>
                                                {season.gender === 2 ?
                                                    <img style={{ width: 150, height: 200 }} src={Male} alt={season.original_name} /> :
                                                    <img style={{ width: 150, height: 200 }} src={Female} alt={season.original_name} />}
                                            </div>
                                        }

                                        <p className="center-text">{season.name}</p>
                                        <p>Total episodes: {season.episode_count}</p>
                                    </div>
                                ))}
                            </div> : <h5>There are no results!</h5>}
                    </Grid>
                    : null}
                <Grid item xs={12} sm={12} >
                    <h3 className="page_title">Cast</h3>
                    {cast.length ?
                        <div className="cast_list" >
                            {cast.map((cast) => (
                                <div key={cast.id} >
                                    {cast.profile_path !== null ?
                                        <img className="showinfo_content" src={getImageUrl('500', cast.profile_path)} alt={cast.profile_path} style={{ width: 150, height: 200 }} /> :
                                        <div>
                                            {cast.gender === 2 ?
                                                <img style={{ width: 150, height: 200 }} src={Male} alt={cast.original_name} /> :
                                                <img style={{ width: 150, height: 200 }} src={Female} alt={cast.original_name} />}
                                        </div>
                                    }

                                    <p className="center-text">{cast.original_name}</p>
                                </div>
                            ))}
                        </div> : <h5>There are no results!</h5>}
                </Grid>
                <Grid item xs={12} sm={12} >
                    <h3 className="page_title">Recommendations</h3>
                    {recommendations.length ?
                        <div className="cast_list" >
                            {recommendations.map((recommendation) => (
                                <div key={recommendation.id} >
                                    <Link to={`${recommendation.id}`} >
                                        {recommendation.poster_path ?
                                            <img className="showinfo_content" src={getImageUrl('500', recommendation.poster_path)} alt={recommendation.poster_path} style={{ width: 150, height: 200 }} /> :
                                            <img className="showinfo_image" src={noMovieImage} alt={recommendation.profile_path} style={{ width: 150, height: 200 }} />}
                                        <p className="center-text">{recommendation.original_title}</p>
                                    </Link>
                                </div>
                            ))}
                        </div> : <h5>There are no results!</h5>}
                </Grid>
            </Grid>
        )
    } else {
        return (
            <div className="loading-data" >
                <CircularProgress />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authResponse: state.authenticateUser.authResponse,
        favMoviesList: state.profile.favMovies.results,
        favTvShows: state.profile.tvShows.results,
        responseFavShow: state.account.responseFavShow,
        responseWatchlistShow: state.account.responseWatchlistShow
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postFavShow: (type, showid, isFav) => {
            dispatch(postFavShow(type, showid, isFav))
        },
        postMovieToWatchList: (type, showId, isFav) => {
            dispatch(postMovieToWatchList(type, showId, isFav))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShowInfoComponent);