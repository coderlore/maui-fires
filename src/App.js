import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import { createTheme } from "@mui/material/styles";
import { Button, Grid, Typography, Alert } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import axios from "axios";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  const [foundData, setFoundData] = useState([]);
  const [notLocatedData, setNotLocatedData] = useState([]);
  const [all, setAll] = useState([]);
  const [deceasedData, setDeceasedData] = useState([]);

  const handleClick = () => {
    setFoundData(foundData);
    setNotLocatedData(notLocatedData);
    setDeceasedData(deceasedData);
  };

  useEffect(() => {
    axios
      .get("./found.json")
      .then((res) => {
        setFoundData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("./notlocated.json")
      .then((res) => setNotLocatedData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("./sheet1.json")
      .then((res) => setAll(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("./deceased.json")
      .then((res) => setDeceasedData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={12} s={12} md={12} lg={12}>
          <Typography
            variant="h5"
            sx={{
              padding: "2rem",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            Maui Fires People Locator
          </Typography>
          <Alert severity="warning" sx={{ fontSize: 12 }} className="text-left">
            PLEASE NOTE: This effort was started by local volunteers. The
            information in this list is a crowdsourced compilation of data,
            gathered from the form on this site, social media and other direct
            contact information. Due to the nature of this data, we expect some
            level of human error. The information provided is not verified and
            by using this information, you are doing so at your own risk. Please
            do not rely solely on this information.
            <br></br>
            This site does not claim to have all information on missing, found
            or deceased persons. Official Resources: American Red Cross (800)
            733-2767,{" "}
            <a
              className="text-rose-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.mauicounty.gov"
            >
              Maui County
            </a>{" "}
            and Family Assistance Centers are now open read. Press release{" "}
            <a
              className="text-rose-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.mauicounty.gov/CivicAlerts.aspx?AID=12725"
            >
              here
            </a>
            .<br></br>
            For privacy reasons and out of concern for families, we are only
            listing lives lost if families give us permission or we have
            confirmation via the media. Community Support Resource:{" "}
            <a
              className="text-rose-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.mauinuistrong.info"
            >
              Maui Nui strong{" "}
            </a>
            <br></br>
            This data is maintained by individual volunteers and is not made or
            endorsed by the American Red cross or any county, state, or federal
            agency.
          </Alert>
          <Router>
            <div className="flex m-2 justify-center">
              <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                  maxWidth: "20rem",
                  width: "50%",
                  maxHeight: "3rem",
                  margin: 1,
                  fontSize: 12,
                }}
              >
                <Link to="/searchbar">I am looking for someone</Link>
              </Button>
              <Button
                variant="contained"
                sx={{
                  maxWidth: "20rem",
                  width: "50%",
                  maxHeight: "3rem",
                  margin: 1,
                  fontSize: 12,
                }}
              >
                <Link to="https://docs.google.com/forms/d/e/1FAIpQLSf6klmKtDjKVEvnV7XQz_Xw59gxBcMSW0JtU_VhUiZUP-FtUw/viewform">
                  I have information about someone
                </Link>
              </Button>
            </div>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route
                exact
                path="/searchbar"
                element={
                  <SearchBar
                    foundData={foundData}
                    notLocatedData={notLocatedData}
                    all={all}
                    deceasedData={deceasedData}
                  />
                }
              ></Route>
              <Route
                exact
                path="https://docs.google.com/forms/d/e/1FAIpQLSf6klmKtDjKVEvnV7XQz_Xw59gxBcMSW0JtU_VhUiZUP-FtUw/viewform"
              ></Route>
            </Routes>
          </Router>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
