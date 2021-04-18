import React, { useEffect, useState } from 'react';
import './showinfo.css';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import { getCredits, getRecommendations, getShowData, postFavouriteShow } from '../../../common/services/api'
import Image from '../Image/image'
import Male from '../../../male.png'
import Female from '../../../female.jpg'
import Button from '@material-ui/core/Button';
import { Link, useParams } from 'react-router-dom'

function ShowInfo({ success }) {

    let params = useParams();


    const [showDetails, setShowDetails] = useState({})
    const [cast, setCast] = useState({});
    const [recommendations, setRecommendations] = useState({})
    const [apiStatus, setApiStatus] = useState(false)
    const [isFavSuccess, setIsFavSuccess] = useState(false);
    const [favPostMessage, setFavPostMessage] = useState('');
    const [isAddFav, setIsAddFav] = useState(false)

    let status = success;

    useEffect(() => {
        let showId = params.showId;

        getShowData(showId).then(res => {
            if (res.status === 200) {
                setShowDetails(res.data)
                getCredits(showId).then(res => {
                    setCast(res.cast)
                    getRecommendations(showId).then(res => {
                        setRecommendations(res.results)
                    })
                });
                setApiStatus(true)
            } else {
                setApiStatus(false)
            }
        });

    }, [params.showId, status])


    const addFavouriteShow = (isFavourite) => {
        setIsAddFav(true)
        const body = {
            "media_type": "movie",
            "media_id": params.showId,
            "favorite": isFavourite
        }
        postFavouriteShow(localStorage.getItem('session_id'), body).then(res => {
            setIsFavSuccess(res.success);
            setIsAddFav(true)
            setFavPostMessage(res.status_message);
            setTimeout(() => {
                setIsFavSuccess(false)
            }, 3000);
        });
    }


    if (apiStatus && Object.keys(showDetails).length > 0) {
        let year = typeof showDetails.release_date === 'string' ? showDetails.release_date.split("-")[0] : ""
        let runtime = showDetails.runtime;
        var hours = Math.floor(runtime / 60);
        var minutes = Math.floor(runtime % 60)

        var formattedTime = hours + 'hr ' + minutes + 'm ';
        return (<div className="showInfo_component" >
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} >
                    <Image imageSize={'500'} url={showDetails.poster_path} hasStyle={true} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid item xs={12}>
                        <h3 className="page_title">{showDetails.original_title}</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <h5>{showDetails.tagline}</h5>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6} sm={3}>
                            {year}
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            {formattedTime}
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
                    {status === true ?
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <h4 className="page_title">Your Rating</h4>
                                <div><Rating name="customized-10" defaultValue={0} max={10} /></div>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="outlined">Add to watchlist</Button>
                            </Grid>
                            <Grid item xs={4}>
                                {/* disabled={isAddFav} onClick={() => addFavouriteShow(true)} */}
                                <Button variant="outlined" disabled={isAddFav} onClick={() => addFavouriteShow(true)}>Add to favourite</Button>
                                {/* <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={isFavSuccess} >
                                    <Alert severity="success"><h6>{favPostMessage}</h6></Alert>
                                </Snackbar> */}
                            </Grid>
                        </Grid>
                        : null}
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} >
                <h3 className="page_title">Cast</h3>
                {cast.length ?
                    <div className="cast_list textColor" >
                        {cast.map((cast) => (
                            <div className="cast_info" key={cast.id} >
                                <div className="castCard" >
                                    <div className="cast_image">
                                        {/* gender 2 -male ; gender 1 - female */}
                                        {cast.profile_path !== null ?
                                            <Image height={'10%'} width={'60%'} imageSize={'500'} url={cast.profile_path} /> :
                                            <div>
                                                {cast.gender === 2 ?
                                                    <img height={'10%'} width={'60%'} src={Male} alt={cast.original_name} /> :
                                                    <img height={'10%'} width={'60%'} src={Female} alt={cast.original_name} />}
                                            </div>
                                        }
                                    </div>
                                    <p className="textColor">{cast.original_name}</p>
                                </div>
                            </div>
                        ))}
                    </div> : <h5>There are no results!</h5>}
            </Grid>
            <Grid item xs={12} sm={12}>
                <h3 className="page_title">Recommendations</h3>
                {recommendations.length ?
                    <div className="recommendations_component">
                        <div className="recommendations_list" >
                            {recommendations.map((recommendation) => (
                                <div className="recommendations_info" key={recommendation.id} >
                                    <div className="recommendationsCard" >
                                        <div className="recommendations_image" >
                                            <Link to={`${recommendation.id}`} >
                                                <Image height={'10%'} width={'60%'} imageSize={'500'} url={recommendation.poster_path} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> :
                    <h5>There are no recommendations!</h5>
                }
            </Grid>
        </div>);
    } else {
        return (
            <div>No info found!</div>
        );
    }
}

export default ShowInfo;