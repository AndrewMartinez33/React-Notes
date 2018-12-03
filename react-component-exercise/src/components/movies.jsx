import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <p>Showing {count} movies in the database</p>
        <div className="App">
          <main className="container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {this.state.movies.map(movie => (
                  <tr key={movie._id}>
                    <th>{movie.title}</th>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger btn-sm m-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
