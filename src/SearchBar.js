import React, { useState } from "react";
import Fuse from "fuse.js";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Tabs,
  Tab,
  Box,
  Alert,
} from "@mui/material";
import { theme } from "./App";
import PropTypes from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const SearchBar = (props) => {
  const [query, updateQuery] = useState("");
  const [tab, setTabValue] = useState(0);
  const [dataset, setDataset] = useState(props.all);
  const [count, setCount] = useState(props.all.length);

  const fuse = new Fuse(dataset, {
    keys: ["Name", "Last Name"],
    includeScore: true,
    shouldSort: true,
  });
  const results = fuse.search(query);

  const personResults = query ? results.map((person) => person.item) : dataset;

  const onSearch = ({ currentTarget }) => {
    updateQuery(currentTarget.value);
    if (currentTarget.value === "") {
      setCount(props.all.length);
    } else {
      setCount(10);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    updateQuery("");
    setCount(props.foundData.length);
    if (newValue === 1) {
      setDataset(props.foundData);
    } else if (newValue === 2) {
      setDataset(props.notLocatedData);
    } else if (newValue === 3) {
      setDataset(props.deceasedData);
    } else {
      setDataset(props.all);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} s={12} md={12} lg={12}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            height: "1rem",
            width: "100%",
            borderBottom: 1,
            borderColor: "divider",
            marginTop: 2,
          }}
        >
          <Tab label="All" />
          <Tab label="Found" />
          <Tab label="Not Located" wrapped />
          <Tab label="Lost Lives" wrapped />
        </Tabs>
        <CustomTabPanel value={tab} index={0}>
          <Alert
            severity="warning"
            sx={{
              fontSize: 12,
              marginBottom: 2,
              display: "flex",
              justifyContent: "center",
            }}
            className="text-left"
          >
            NOTE: This list contains a combination of <strong>only</strong> the
            found and not located list.
          </Alert>
          <Typography>Search all</Typography>
          <form className="search w-full">
            <TextField
              id="input-search"
              placeholder="Enter full name"
              value={query}
              onChange={onSearch}
              size="small"
              focused
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                }
              }}
              sx={{
                borderRadius: 2,
              }}
            />
          </form>
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <Typography>Search for found</Typography>
          <form className="search w-full">
            <TextField
              id="input-search"
              placeholder="Enter full name"
              value={query}
              onChange={onSearch}
              size="small"
              focused
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                }
              }}
              sx={{
                borderRadius: 2,
              }}
            />
          </form>
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={2}>
          <Typography>Search for not located</Typography>
          <form className="search w-full">
            <TextField
              id="input-search"
              placeholder="Enter full name"
              value={query}
              onChange={onSearch}
              size="small"
              focused
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                }
              }}
              sx={{
                borderRadius: 2,
              }}
            />
          </form>
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={3}>
          <Alert
            severity="warning"
            sx={{ fontSize: 12, marginBottom: 2 }}
            className="text-left"
          >
            TRIGGER WARNING: Sensitive Content - Loss of Lives in Fire
            <br></br>
            The following content contains a list of individuals who tragically
            lost their lives in the a fire-related incident. The reason we are
            providing this information is to reduce duplicate adds of NOT
            LOCATED to our main database and to provide a place to account for
            all those confirmed deceased through reputable media outlets and
            sources. These are not reports from private friends or family.
            Please be aware this links discuss instances of mortality resulting
            from fire, which may be distressing for some readers. Reader
            discretion is advised. If you or someone you know is struggling with
            feeling related to this topic, please consider seeking support from
            appropriate resources or individuals. Remember you are not alone,
            and help is available. May all these individuals Rest in Love. Our
            Hearts are with their Families and Friends.
            <br></br>
            <a
              className="text-rose-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.noshamegethelp.org/?fbclid=IwAR2aF77-Zyr7fADhwPeU4WyyN_WRiGBgCrJl5GThr-CV__AiV-7yNf0AEBY"
            >
              Link to Mental Health Resources
            </a>
          </Alert>
          <Alert
            severity="warning"
            sx={{ fontSize: 12, marginBottom: 2 }}
            className="text-left"
          >
            Click on the links below at your own risk
          </Alert>
          <Typography>Search for lost lives</Typography>
          <form className="search w-full">
            <TextField
              id="input-search"
              placeholder="Enter full name"
              value={query}
              onChange={onSearch}
              size="small"
              focused
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                }
              }}
              sx={{
                borderRadius: 2,
              }}
            />
          </form>
        </CustomTabPanel>
      </Grid>
      {query && (
        <Grid
          item
          xs={12}
          s={12}
          md={12}
          lg={12}
          className="flex justify-center"
        >
          <Typography
            variant="h6"
            sx={{ color: theme.palette.primary.main, pt: 1 }}
          >
            Closest matches:
          </Typography>
        </Grid>
      )}
      {personResults.slice(0, count).map((person, index) => {
        const { Name, Status, Notes } = person;
        return (
          <Grid
            item
            xs={12}
            s={6}
            md={4}
            lg={3}
            xl={3}
            className="flex justify-center"
            key={index}
          >
            <Card
              sx={{
                width: "20rem",
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
                marginBottom: 1,
              }}
              variant="outlined"
            >
              <CardContent
                sx={{
                  color: theme.palette.primary.contrastText,
                }}
              >
                <Typography className="text-left p-1">
                  <strong>Name:</strong> {Name}
                </Typography>
                <Typography className="text-left p-1">
                  <strong>Status:</strong> {Status}
                </Typography>
                {tab === 3 ? (
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    className="text-left p-1"
                  >
                    <strong>Sources:</strong>{" "}
                    <a
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={Notes}
                    >
                      {Notes}
                    </a>
                  </Typography>
                ) : (
                  <Typography
                    style={{ wordWrap: "break-word" }}
                    className="text-left p-1"
                  >
                    <strong>Notes:</strong> {Notes}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SearchBar;
