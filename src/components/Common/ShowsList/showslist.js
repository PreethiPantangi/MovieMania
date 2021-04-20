import './showslist.css'
import React, { useEffect, useState } from 'react';
import { getImageUrl, getShowsByGenreIdUrl } from '../../../redux/endpoints';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const ShowsListComponent = () => {

    let genreId = useParams().genreId;
    let genreName = useParams().genreName;
    let type = useParams().type;
    const [receivedData, setReceivedData] = useState(false)

    const [shows, setShows] = useState({})


    useEffect(() => {
        axios.get(getShowsByGenreIdUrl(genreId))
            .then(res => {
                setShows(res.data);
                setReceivedData(true)
            })
            .catch(err => {
                console.log(err);
            })
    })

    return (
        <div>
            <h4>{genreName}</h4>
            <div className="showslist" >
                {receivedData && shows && shows.results && shows.results.map(show =>
                    <Link key={show.id} to={`/${type}/${show.id}`} >
                        <div key={show.id} className="show_card" >
                            <img className="showslist_image" src={getImageUrl('500', show.poster_path)} alt={show.original_title} style={{ width: 250, height: 400 }} />
                            <p className="showlist_name" >{show.original_title}</p>
                        </div>
                    </Link>
                )}
                {!receivedData ?
                    <div className="loading-data" >
                        <CircularProgress />
                    </div>
                    : null}
            </div>
        </div>
    );
}

export default ShowsListComponent;
