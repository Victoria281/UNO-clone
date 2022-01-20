import "../css/home.css";
import { Grid, styled, Paper, Typography } from '@mui/material';
import { homeAnimation } from "./homeAnimation";
import { useEffect } from "react";
import { typography } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: theme.spacing(4),
  borderTopRightRadius: 50,
  borderBottomRightRadius: 50,
  ":hover": {
    transform: 'scale(1.05,1.05)'
  }
}));

const Home = () => {
  useEffect(() => {
    homeAnimation()
  }, [])

  return (
    <Grid container spacing={2} className="App">
      <Grid item xs={0.5}></Grid>
      <Grid item xs={6} sx={{ mt: 10 }}>
        <Typography variant="h1">Uno Clone</Typography>
        <Item sx={{ bgcolor: 'info.main' }}>
          <a className="startBtn" href="./game">
            Single Player
          </a>
        </Item>
        <Item sx={{ bgcolor: 'secondary.main' }}>
          <a className="startMultiBtn" href="./createroom">
            Multiplayer
          </a>
        </Item>
        <Item sx={{ bgcolor: 'error.main' }}>
          <a className="leaderBoardBtn" href="./leaderboard">
            LeaderBoard
          </a>
        </Item>
        <Item sx={{ bgcolor: 'success.main' }}>
          <a className="profileBtn" href="./profile">
            Profile
          </a>
        </Item>
      </Grid>
    </Grid>
    // <div>
    //   hihrvieu
    // </div>
  );
}

export default Home;