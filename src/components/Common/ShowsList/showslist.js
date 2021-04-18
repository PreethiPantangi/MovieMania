import './showslist.css'
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getShows } from '../../../redux'
import { getImageUrl } from '../../../redux/endpoints';
import { Link, useParams } from 'react-router-dom';

const ShowsListComponent = ({ getShows, shows }) => {

    let genreId = useParams().genreId;
    let genreName = useParams().genreName;
    let type = useParams().type;

    useEffect(() => {
        getShows(genreId)
    }, [genreId, genreName, getShows])

    return (
        <div>
            <h4>{genreName}</h4>
            <div className="showslist" >
                {shows && shows.results && shows.results.map(show =>
                    <Link key={show.id} to={`/${type}/${show.id}`} >
                        <div key={show.id} className="show_card" >
                            <img className="showslist_image" src={getImageUrl('500', show.poster_path)} alt={show.original_title} style={{ width: 250, height: 400 }} />
                            <p className="showlist_name" >{show.original_title}</p>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}


export const mapStateToProps = state => {
    return {
        shows: state.shows.shows
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        getShows: (genreID) => {
            dispatch(getShows(genreID));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowsListComponent);