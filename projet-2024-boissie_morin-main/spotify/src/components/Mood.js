import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Tabs, Tab, Box } from "@mui/material";
import { getTopArtists } from "../services/spotify";

const RecommendationsTabs = () => {
  const [accessToken, setAccessToken] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAccessToken(token);
    getTopArtists().then((topArtists) => setTopArtists(topArtists));
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Energisé" />
        <Tab label="Détente" />
        <Tab label="Mélancolique" />
        <Tab label="Romantique" />
        <Tab label="Serein" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Recommendations
          mood="D'humeur énergique? Voici quelques recommandations..."
          seedArtists={topArtists
            .map((artist) => artist.id)
            .slice(0, 5)
            .join(",")}
          seedGenres="rock,pop,house"
          accessToken={accessToken}
          target_energy="0.8"
          target_danceability="0.85"
          target_loudness="-5"
          target_speechiness="0.1"
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Recommendations
          mood="D'humeur détendue? Voici quelques recommandations..."
          seedArtists={topArtists
            .map((artist) => artist.id)
            .slice(0, 5)
            .join(",")}
          seedGenres="chill,acoustic"
          accessToken={accessToken}
          target_energy="0.4"
          target_danceability="0.6"
          target_loudness="-10"
          target_speechiness="0.05"
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Recommendations
          mood="D'humeur mélancolique? Voici quelques recommandations..."
          seedArtists={topArtists
            .map((artist) => artist.id)
            .slice(0, 5)
            .join(",")}
          seedGenres="jazz,blues,soul"
          accessToken={accessToken}
          target_energy="0.3"
          target_danceability="0.3"
          target_loudness="-15"
          target_speechiness="0.02"
        />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Recommendations
          mood="D'humeur romantique? Voici quelques recommandations..."
          seedArtists={topArtists
            .map((artist) => artist.id)
            .slice(0, 5)
            .join(",")}
          seedGenres="R&B,ballad"
          accessToken={accessToken}
          target_energy="0.5"
          target_danceability="0.6"
          target_loudness="-8"
          target_speechiness="0.2"
        />
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Recommendations
          mood="D'humeur sereine? Voici quelques recommandations..."
          seedArtists={topArtists
            .map((artist) => artist.id)
            .slice(0, 5)
            .join(",")}
          seedGenres="classical, piano, meditation"
          accessToken={accessToken}
          target_energy="0.4"
          target_danceability="0.4"
          target_loudness="-12"
          target_speechiness="0.3"
        />
      </TabPanel>
    </div>
  );
};

const Recommendations = ({
  mood,
  seedArtists,
  seedGenres,
  accessToken,
  target_energy,
  target_danceability,
  target_loudness,
  target_speechiness,
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const limit = 10;

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (!accessToken) return;

        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?seed_artists=${seedArtists}&seed_genres=${seedGenres}&limit=${limit}&target_energy=${target_energy}&target_danceability=${target_danceability}&target_loudness=${target_loudness}&target_speechiness=${target_speechiness}`,

          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setRecommendations(data.tracks || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (accessToken) {
      fetchRecommendations();
    }
  }, [accessToken, seedArtists, seedGenres, limit]);

  return (
    <div>
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </Typography>
          <ul>
            {recommendations.map((track, index) => (
              <li key={index}>
                <Typography variant="body1">{track.name}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Artists:{" "}
                  {track.artists.map((artist) => artist.name).join(", ")}
                </Typography>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default RecommendationsTabs;
