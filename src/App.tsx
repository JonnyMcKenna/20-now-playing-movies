import React from "react";
import "./App.css";
import sortImage from './image/sort-image.png';

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
      direction: "desc",
    };

    this.sortBy = this.sortBy.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=d68f38001ae6980d0c0cf024880200d6"
    ).then((response) => {
      response.json().then((data) => this.setState({ movieData: data.results.sort(this.compareBy('vote_average', 'desc')) || [] }));
    }).catch((error) => {
      console.log(error);
    });

  }

  compareBy(key: string, direction: string) {
    return function (a: any, b: any) {
      if (direction === "asc") {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      }

      if (a[key] > b[key]) return -1;
      if (a[key] < b[key]) return 1;
      return 0;
    };
  }

  sortBy(key: string) {
    let arrayCopy = [...this.state.movieData];
    let direction = this.state.direction === "asc" ? "desc" : "asc";
    arrayCopy.sort(this.compareBy(key, direction));
    this.setState({ movieData: arrayCopy, direction });
  }

  render() {

  function TableData( props: any ) {
    const { movie : {vote_average, original_title, poster_path, release_date}, movie } = props;

    return (
      <tr data-item={movie}>
      <td data-title="Rating">{vote_average}</td>
      <td data-title="Title">{original_title}</td>
      <td data-title="Poster"><img src={"https://image.tmdb.org/t/p/original/" + poster_path} alt={original_title} height="60"/></td>
      <td data-title="Release Date">{release_date}</td>
    </tr>
    )
  }
    
  function Table( props:any ) {
    const { onClick, newData } = props;

    return (
      <table id="movie-table" className="m-table">
      <thead>
        <tr>
          <th key={"rating-header"} id="rating-header" onClick={(e) => onClick("vote_average")}>Rating<img src={sortImage} alt="sort" className="sortImage"/></th>
          <th key={"title-header"} id="title-header">Title</th>
          <th key={"poster-header"} id="poster-header">Poster</th>
          <th key={"release-date-header"} id="release-date-header">Release Date</th>
        </tr>
      </thead>
      <tbody>
        {newData.map(function (movie: any, index: any) {
          return (
            <TableData key={index} movie={movie}/>
          );
        })}
      </tbody>
    </table>
    );
  }

    return (
      <div id="App">
        <h1 id="heading">{"20 Now Playing Movies"}</h1>
        <p id="description">
          {"Please sort the table by clicking on the rating table header."}
        </p>
        <Table onClick={this.sortBy} newData={this.state.movieData}/>;
        <p className="footer"><a className="websiteURL" href="https://www.jonnymckenna.com/">Designed and Developed by Jonathan McKenna</a></p>
      </div>
    );
  }
}
