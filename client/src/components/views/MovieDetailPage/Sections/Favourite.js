import React, { useEffect, useState } from "react";
import axios from "axios";
function Favourite(props) {
  const [favouriteNumber, setFavouriteNumber] = useState(0);
  const [Favourited, setFavourited] = useState(false);
  const variable = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime,
  };
  useEffect(() => {
    axios.post("/api/favourite/favouriteNumber", variable).then((response) => {
      if (response.data.success) {
        setFavouriteNumber(response.data.FavouriteNumber);
      } else {
        alert("failed to get favourite number");
      }
    });

    axios.post("/api/favourite/favourited", variable).then((response) => {
      if (response.data.success) {
        setFavourited(response.data.favourited);
      }
    });
  }, []);

  const onClickfavourite = () => {
    if (Favourited) {
      axios
        .post("/api/favourite/removeFromFavourite", variable)
        .then((response) => {
          if (response.data.success) {
            setFavouriteNumber(favouriteNumber - 1);
            setFavourited(!Favourited);
          } else {
            alert("Failed to Remove to Favourite");
          }
        });
    } else {
      axios.post("/api/favourite/addToFavourite", variable).then((response) => {
        if (response.data.success) {
          setFavouriteNumber(favouriteNumber + 1);
          setFavourited(!Favourited);
        } else {
          alert("Failed to Add to Favourite");
        }
      });
    }
  };

  return (
    <div>
      <button onClick={onClickfavourite}>
        {Favourited && Favourited
          ? "Remove from Favourite"
          : "Add to Favourite"}{" "}
        {favouriteNumber}
      </button>
    </div>
  );
}

export default Favourite;
