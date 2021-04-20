import './categories.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMoviesOrTvShowsUrl, getImageUrl } from '../../../redux/endpoints'
import { Link } from 'react-router-dom'

function CategoriesComponent({ type, category, title }) {

    const [movies, setMovies] = useState([])

    console.log('type categories - ', type);

    useEffect(() => {
        axios.get(getMoviesOrTvShowsUrl(type, category))
            .then(res => {
                setMovies(res.data.results);
            })
            .catch(err => {
                console.log(err.response);
            })
    }, [category, type])

    return (
        <div>
            <h3>{title}</h3>
            <div className="categories_component">
                {movies && movies.map((d) => (
                    // to={`/showInfo/${d.id}`} data={{ 'type': type }} 
                    <Link key={d.id} to={{ pathname: `/${type}/${d.id}`, data: { 'type': type } }} >
                        <div className="categories_item" >
                            <img className="categories_image" style={{ width: 250, height: 300 }} src={getImageUrl('500', d.poster_path)} alt={d.name} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}


export default CategoriesComponent;