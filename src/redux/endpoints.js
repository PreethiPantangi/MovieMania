import axios from "axios";
const auth_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGJhMTY4YjkyYTZkOWU3MjcwMzM4MzhjNTkwNWI0YiIsInN1YiI6IjYwNjU0ZmNlZDEzMzI0MDA1OTQxZmRlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._TPbQ0bgwqnj2G_ieO3aaYpIXuwbGpke_FELGNwuy7Q';

axios.interceptors.request.use(
    config => {
        if (auth_token) {
            config.headers['Authorization'] = 'Bearer ' + auth_token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
);

export function authenticateUserUrl() {
    return `https://api.themoviedb.org/3/authentication/token/validate_with_login`
}

export function generateNewTokenUrl() {
    return `https://api.themoviedb.org/3/authentication/token/new`;
}

export function generateSessionIdUrl() {
    return `https://api.themoviedb.org/3/authentication/session/new`;
}

export function getGenresUrl(type) {
    return `https://api.themoviedb.org/3/genre/${type}/list`;
}

export function getMoviesOrTvShowsUrl(type, category) {
    return `https://api.themoviedb.org/3/${type}/${category}`;
}

export function getImageUrl(size, imageName) {
    let url = `https://image.tmdb.org/t/p/w${size}${imageName}`
    return url
}

export function getShowsByGenreIdUrl(genreId) {
    return `https://api.themoviedb.org/3/genre/${genreId}/movies`
}


export function getShowDetailsUrl(showId) {
    return `https://api.themoviedb.org/3/movie/${showId}`
}

export function getCreditsUrl(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}/credits`
}

export function getRecommendationsUrl(showId) {
    return `https://api.themoviedb.org/3/movie/${showId}/recommendations`
}

export function postFavouriteShowUrl(sessionId) {
    return `https://api.themoviedb.org/3/account/${localStorage.getItem('account_id')}/favorite?session_id=${sessionId}`

}

export function postMovieReviewUrl(movieId, sessionId) {
    return `https://api.themoviedb.org/3/movie/${movieId}/rating?session_id=${sessionId}`
}

export function getUserDetailsUrl(sessionId) {
    return `https://api.themoviedb.org/3/account?session_id=${sessionId}`;
}

export function getFavouriteShowUrl(session_id, type) {
    let accountId = localStorage.getItem('account_id');
    return `https://api.themoviedb.org/3/account/${accountId}/favorite/${type}?session_id=${session_id}`
}
