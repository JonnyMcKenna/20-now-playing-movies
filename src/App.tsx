import React from "react";
import "./App.css";

type MyProps = {};
type MyState = {
  movieData: { original_title: number, vote_average: number }[],
  direction: string,
};

export default class App extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      movieData: [],
      direction: "asc",
    };
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=d68f38001ae6980d0c0cf024880200d6"
    )
      .then((resp) => resp.json())
      .then((data) => this.setState({ movieData: data.results || [] }));
  }

  compareBy(key: string, direction: string) {
    return function (a: any, b: any) {
      if (direction === "asc") {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      } else {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      }
    };
  }

  sortBy(key: string) {
    let arrayCopy = [...this.state.movieData];
    let direction = this.state.direction === "asc" ? "desc" : "asc";
    arrayCopy.sort(this.compareBy(key, direction));
    this.setState({ movieData: arrayCopy, direction });
  }

  render() {
    var newdata = this.state.movieData;
    return (
      <div id="App">
        <h1 id="heading">{"20 Now Playing Movies"}</h1>
        <p id="description">
          {"Please sort the table by clicking on the rating table header."}
        </p>

        <table id="movie-table" className="m-table">
          <thead>
            <tr style={{ marginBottom: "10px" }}>
              <th id="title-header">Title</th>
              <th id="rating-header" onClick={(e) => this.sortBy("vote_average")}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {newdata.map(function (movie: any, index: any) {
              return (
                <tr key={index} data-item={movie}>
                  <td data-title="Title">{movie.original_title}</td>
                  <td data-title="Rating">{movie.vote_average}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
