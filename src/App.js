import React from 'react'
import axios from "axios";
import Movie from "./components/Movie"
import "./App.css"

class App extends React.Component{
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    const {data:{data:{movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating")
    console.log(movies)
    this.setState({movies:movies, isLoading:false})
  }

  componentDidMount(){
    this.getMovies();
  }

  render(){
    const {isLoading, movies} = this.state;
    return (
    <section className="container">
      {isLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div> 
        ):(
          <div className="movies">
            {movies.map(movie => 
              <Movie 
                key={movie.id} 
                title={movie.title}
                year={movie.year}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            )}
          </div>
        )}
    </section>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <h1>Hello!!!</h1>
//     </div>
//   );
// }

export default App;
