import React, { useState, useEffect } from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  getUserData,
  getTopTracks,
  getTopArtists,
  getFollowedArtists,
} from "../services/spotify";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);

  useEffect(() => {
    // Fetch user data
    getUserData()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Fetch top tracks
    getTopTracks()
      .then((tracks) => {
        if (Array.isArray(tracks)) {
          setTopTracks(tracks);
        }
      })
      .catch((error) => {
        console.error("Error fetching top tracks:", error);
      });

    // Fetch top artists
    getTopArtists()
      .then((artists) => {
        if (Array.isArray(artists)) {
          setTopArtists(artists);
        }
      })
      .catch((error) => {
        console.error("Error fetching top artists:", error);
      });

    // Fetch followed artists
    getFollowedArtists()
      .then((artists) => {
        if (Array.isArray(artists)) {
          setFollowedArtists(artists);
        }
      })
      .catch((error) => {
        console.error("Error fetching followed artists:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Display user profile */}
      {userData && (
        <Card style={{ marginBottom: "20px", marginTop: "20px" }}>
          <CardContent>
            <Typography variant="h4">User Profile</Typography>
            {/* Increase Avatar size */}
            <Avatar
              src={
                userData.images && userData.images.length > 0
                  ? userData.images[0].url
                  : ""
              }
              alt={userData.display_name}
              sx={{ width: 150, height: 150 }} // Customize Avatar size here
            />
            <Typography variant="h5">{userData.display_name}</Typography>
            <Typography variant="body1">Email: {userData.email}</Typography>
            <Typography variant="body1">Product: {userData.product}</Typography>
            {/* Add a link to connect to Spotify */}
            <a
              href="https://accounts.spotify.com/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect to Spotify
            </a>
          </CardContent>
        </Card>
      )}

      {/* Display top tracks */}
      <Typography
        variant="h4"
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        Top Tracks
      </Typography>
      <Grid container spacing={2}>
        {topTracks.map((track) => (
          <Grid item key={track.id}>
            <Card>
              <CardContent>
                <Typography variant="body1">{track.name}</Typography>
                <Typography variant="body2">
                  {track.artists && track.artists.length > 0
                    ? track.artists[0].name
                    : ""}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Display top artists */}
      <Typography
        variant="h4"
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        Top Artists
      </Typography>
      <Grid container spacing={2}>
        {topArtists.map((artist) => (
          <Grid item key={artist.id}>
            <Card>
              <CardContent>
                <Typography variant="body1">{artist.name}</Typography>
                <Typography variant="body2">
                  {artist.genres && artist.genres.length > 0
                    ? artist.genres.join(", ")
                    : "No genres available"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Display followed artists */}
      <Typography
        variant="h4"
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        Followed Artists
      </Typography>
      <Grid container spacing={2}>
        {followedArtists.length > 0 ? (
          followedArtists.map((artist) => (
            <Grid item key={artist.id}>
              <Card>
                <CardContent>
                  <Typography variant="body1">{artist.name}</Typography>
                  <Typography variant="body2">
                    {artist.genres && artist.genres.length > 0
                      ? artist.genres.join(", ")
                      : "No genres available"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No followed artists found.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default Profile;
