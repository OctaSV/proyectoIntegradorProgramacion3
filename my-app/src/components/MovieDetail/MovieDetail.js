import React, { Component } from 'react'
import './MovieDetail.css'
import Loader from '../Loader/Loader';


class MovieDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: Number(props.match.params.id),
            dataMovie: {
                genres: []
            },
            favText: <i className="fa-regular fa-heart"></i>,
            loading: true
        }

        console.log(props);

    };

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=d1566b6a7005fc1288c0cf8495a15e2e&language=en-US`)
        .then(response => response.json())
        .then(info => this.setState({
            dataMovie: info,
            loading: false
        }, () => console.log(info)))
        .catch(err => console.log(err))

        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos');

        if (recuperoStorage !== null) {
            let storageToArray = JSON.parse(recuperoStorage);
            favoritos = storageToArray

            if (favoritos.includes(this.state.id)) {
                this.setState({
                    favText: <i className="fa-solid fa-heart"></i>
                })
            } else {
                this.setState({
                    favText: <i className="fa-regular fa-heart"></i>
                })
            }
        }
    }

    agregarQuitarFavs(id){
        // console.log('agregando y quitando');

        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos');

        if (recuperoStorage !== null) {
            let storageToArray = JSON.parse(recuperoStorage);
            favoritos = storageToArray
        }

        if (favoritos.includes(id)) {
            // favoritos = favoritos.filter(unIdDelArray => unIdDelArray !== id) //FORMA 1//
            let idAQuitar = favoritos.indexOf(id);
            favoritos.splice(idAQuitar, 1);
            this.setState({
                favText: <i className="fa-regular fa-heart"></i>
            })
        } else {
            favoritos.push(id);
            this.setState({
                favText: <i className="fa-solid fa-heart"></i>
            })
        }

        let favsToString = JSON.stringify(favoritos)
        localStorage.setItem('favoritos', favsToString)

        console.log(localStorage);
    }

    render(){
        return(
            <React.Fragment>

            {this.state.loading ? 
            
            <Loader/> 
            
            : 

            <div className='containter-detalle'>
                        <img src={`https://image.tmdb.org/t/p/w342/${this.state.dataMovie.poster_path}`} alt={`Portada de la pelicula ${this.state.dataMovie.title}`} className='foto-detalle'/>
                        <div className='organizando-caja'>
                           <h1 className='titulo-detalle'>{this.state.dataMovie.title}</h1>
                        <ul className='lista-detalle'>
                        <div className='items-detalle'>
                            <li className='item-simple'>Rating: <p>{this.state.dataMovie.vote_average}</p></li>
                            <li className='item-simple'>Release date: <p>{this.state.dataMovie.release_date}</p></li>
                            <li className='item-simple'>Duration: <p>{this.state.dataMovie.runtime} minutos</p></li>
                        </div>
                        <ul className='detalle-generos'>
                            <p className='titulo-generos'>Genres:</p> {this.state.dataMovie.genres.map((generoUno, i) => <li className='item-genero' key = {generoUno.id + i}> <p>{generoUno.name}</p> </li>)}
                        </ul>
                            
                            <li className='item-sinopsis'><p>{this.state.dataMovie.overview}</p></li>

                        </ul> 
                        </div>
                        
                        <button className='button-detail-fav' onClick={() => this.agregarQuitarFavs(this.state.id)}>{this.state.favText}</button>
                </div>        
            }
            </React.Fragment>
                
        )
    }
}

export default MovieDetail