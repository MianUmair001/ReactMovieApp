import axios from "axios";
import React, { useEffect, useState } from "react";
import "./favourite.css";
import { Popover } from "antd";
import { IMAGE_URL } from "../../Config";
function FavouritePage() {
  const [favouritedMovies, setfavouritedMovies] = useState([]);
  const variable = { userFrom: localStorage.getItem("userId") };
  useEffect(() => {
    fetchfavouritedMovies();
  }, []);
  const fetchfavouritedMovies = () => {
    axios
      .post("/api/favourite/getFavouritedMovie", variable)
      .then((response) => {
        if (response.data.success) {
          setfavouritedMovies(response.data.favourites);
        } else {
          alert("Failed to Get Favourited Movies");
        }
      });
  };
  const renderTableBody = favouritedMovies.map((movie, index) => {
    const content = (
      <div key={index}>
        {movie.movieImage ? (
          <img
            src={`${IMAGE_URL}w500${movie.movieImage}`}
            alt="moviePost"
            key={index}
          />
        ) : (
          "No Image"
        )}
      </div>
    );

    const onClickRemove = (movieId) => {
      const variable = {
        movieId: movieId,
        userFrom: localStorage.getItem("userId"),
      };
      axios
        .post("/api/favourite/removeFromFavourite", variable)
        .then((response) => {
          if (response.data.success) {
            fetchfavouritedMovies();
          } else {
            alert("Failed to Remove to Favourite");
          }
        });
    };

    return (
      <tr key={movie.id}>
        <Popover content={content} title={`${movie.movieTitle}`}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRunTime}</td>
        <td>
          <button onClick={() => onClickRemove(movie.movieId)}>Remove</button>
        </td>
      </tr>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h3>Favourite Movies By Me</h3>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Run Time</th>
            <th>Remove From Favourite</th>
          </tr>
        </thead>
        <tbody>{renderTableBody}</tbody>
      </table>
    </div>
  );
}

export default FavouritePage;
