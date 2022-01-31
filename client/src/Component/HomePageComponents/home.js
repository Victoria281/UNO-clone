import { Grid, styled, Paper, Typography } from '@mui/material';
import { homeAnimation } from "./homeAnimation";
import { useEffect } from "react";
import { typography } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: theme.spacing(2),
  borderTopRightRadius: 50,
  borderBottomRightRadius: 50,
  ":hover": {
    transform: 'scale(1.05,1.05)'
  },
  width: '75%'
}));

const Home = ({ socket }) => {
  useEffect(() => {
    homeAnimation()
    socket.emit("exitMultiplayer", localStorage.getItem("username"))
  }, [])

  return (
    <Grid container spacing={2} className="App">
      <Grid item xs={1}></Grid>
      <Grid item xs={6}>
        <Typography variant="h1" sx={{ mt: 10,mb:10 }}>Uno Clone</Typography>

        <Item sx={{ bgcolor: 'info.main' }}>
          <a href="./game">
            <p className={styles.startBtn}>Single Player</p>
          </a>
        </Item>

        <Item sx={{ bgcolor: 'secondary.main' }}>
          <a href="./createroom">
            <p className={styles.startMultiBtn}>Multiplayer</p>
          </a>
        </Item>

        <Item sx={{ bgcolor: 'error.main' }}>
          <a href="./leaderboard">
            <p className={styles.leaderBoardBtn}>LeaderBoard</p>
          </a>
        </Item>

        <Item sx={{ bgcolor: 'success.main' }}>
          <a href="./profile">
            <p className={styles.profileBtn}>Profile</p>
          </a>
        </Item>
      </Grid>
    </Grid>
  );
}

export default Home;