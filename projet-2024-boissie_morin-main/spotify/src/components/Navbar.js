import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import {
  isLogged,
  loginSpotify,
  logoutSpotify,
  refreshSpotify,
  getUserData,
} from "../services/spotify";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLogged()) {
      getUserData().then(setUser);
    }
  }, []);

  const handleLogin = () => {
    loginSpotify();
  };

  const handleLogout = () => {
    logoutSpotify();
  };

  const handleRefresh = () => {
    refreshSpotify();
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">SPOTIFRIED</Typography>
        <Button color="inherit" href="/">
          Accueil
        </Button>
        <Button color="inherit" href="/recommandation">
          Recommandations
        </Button>
        <Button color="inherit" href="/profil">
          Profil
        </Button>
        {isLogged() && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2">
              {user ? `Logged in as ${user.display_name}  -` : ""}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <Button color="inherit" onClick={handleRefresh}>
              Refresh
            </Button>
          </div>
        )}
        {!isLogged() && (
          <Button color="inherit" onClick={handleLogin}>
            Login to Spotify
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
