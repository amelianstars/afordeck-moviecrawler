import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'


class App extends Component {
  constructor(props) {
    super(props)
    this.state={}
  //  console.log("This is my initializer")

//     const movies = [
//       {id: 0, poster_src: "https://upload.wikimedia.org/wikipedia/en/7/77/Peanuts_2015.jpg", 
//       title: "The Peanuts Movie", overview: "Life always seems complicated for good ol' Charlie Brown (Noah Schnapp), the boy who always tries his best against seemingly impossible odds."},
//       {id: 1, poster_src: "https://m.media-amazon.com/images/M/MV5BMTQ1NDQxNTcxN15BMl5BanBnXkFtZTgwNzY1Njc1MzE@._V1_.jpg",
//         title: "A Charlie Brown Christmas", overview: "A Charlie Brown Christmas is a 1965 animated television special, and is the first TV special based on the comic strip Peanuts, by Charles M. Schulz."}

//     ]

//     var movieRows = []
//     movies.forEach((movie) => {
//       console.log(movie.title)
//       const movieRow = <MovieRow movie={movie} />
//       movieRows.push(movieRow)
//     })

//     this.state = {rows: movieRows}

this.doSearch("Charlie Brown")
 }

 doSearch(searchTerm) {

    console.log("Do search using moviedatabase api")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
          console.log("Fetch data was a success")
         // console.log(searchResults)
          const results = searchResults.results
         // console.log(results[0])

         var movieRows = []

          results.forEach((movie) => {
            movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
            //console.log(movie.poster_path)
            const movieRow = <MovieRow key={movie.id} movie={movie}/>
            movieRows.push(movieRow)
          })

          this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed at fetching data")
      }
    })
 }

 searchChangeHandler(event) {
   console.log(event.target.value)
   const boundObject = this
   const searchTerm = event.target.value
   this.doSearch(searchTerm)
 }

  render(){
  return (
    <div>
     <table className="topHeading">
       <tbody>
         <tr>
           <td>
             <img width="50" alt="three full movie theater popcorn containers" src="popcorn.jpg"/>
           </td>
           <td width="10"/>
           <td>
             <h1>MovieCrawler Search</h1>
           </td>
         </tr>
       </tbody>
     </table>

     <input style={{
       fontSize: 22,
       display: "block",
       width: "99%",
       paddingTop: 9,
       paddingBottom: 9,
       paddingLeft: 17

     }} onChange={this.searchChangeHandler.bind(this)} placeholder="Search Here" />


     
     
     {this.state.rows}


     </div>

  );

    }}
export default App;
