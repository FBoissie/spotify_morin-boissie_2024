import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import logoImage from "../assets/logo.jpg";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const accessToken = localStorage.getItem("access_token");

  const handleSearch = async () => {
    try {
      console.log("Search for " + searchInput);

      const searchParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      // Recherche d'albums
      const albumsResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=album&market=US&limit=50`,
        searchParameters
      );
      const albumsData = await albumsResponse.json();
      const albums = albumsData.albums.items.map((album) => ({
        ...album,
        type: "album",
      }));

      // Recherche de titres de chansons
      const tracksResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=track&market=US&limit=50`,
        searchParameters
      );
      const tracksData = await tracksResponse.json();
      const tracks = tracksData.tracks.items.map((track) => ({
        ...track,
        type: "track",
      }));

      // Recherche d'artistes
      const artistsResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist&market=US&limit=50`,
        searchParameters
      );
      const artistsData = await artistsResponse.json();
      const artists = artistsData.artists.items.map((artist) => ({
        ...artist,
        type: "artist",
      }));

      // Fusionner les résultats de chaque type de recherche
      const combinedResults = [...albums, ...tracks, ...artists];

      setSearchResults(combinedResults);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const filteredResults = searchResults.filter((result) => {
    if (activeTab === 0) {
      return result.type === "album";
    } else if (activeTab === 1) {
      return result.type === "track";
    } else if (activeTab === 2) {
      return result.type === "artist";
    }
  });

  return (
    <Container>
      {/* Image au-dessus de la barre de recherche */}
      <img
        src={logoImage}
        alt="Logo"
        style={{
          width: "100px",
          padding: "20px", // Réduire la taille du logo à 30% de la largeur
          display: "block", // Afficher l'image en tant que bloc
          margin: "auto", // Centrer l'image horizontalement
          marginBottom: "20px", // Espacement sous l'image
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
              label="Search for a song, album, or artist"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ marginRight: "10px", width: "100%" }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </Grid>
      </Grid>

      <Tabs
        value={activeTab}
        onChange={handleChangeTab}
        centered // Utiliser cette prop pour centrer les onglets
      >
        <Tab label="Albums" />
        <Tab label="Titres" />
        <Tab label="Artistes" />
      </Tabs>

      <Container>
        <Grid container spacing={3}>
          {filteredResults.map((result, i) => (
            <Grid item xs={3} key={i}>
              <Card>
                {result.images && result.images[0] && result.images[0].url && (
                  <CardMedia component="img" src={result.images[0].url} />
                )}
                <CardContent>
                  <Typography>
                    {result.name}
                    {result.artists && result.artists.length > 0 && (
                      <span> - by {result.artists[0].name}</span>
                    )}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default SearchBar;
