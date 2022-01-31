import "./home.css";
import { Grid, styled, Paper, Typography } from '@mui/material';
import { homeAnimation } from "./homeAnimation";
import { useEffect, useState } from "react";
import { typography } from "@mui/system";
import BotDifficultyModal from "../OtherComponents/BotDifficultyComponent/BotDifficultyModal";
import { useHistory } from "react-router-dom";

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
  const [open, setOpen] = useState(false);
  useEffect(() => {
    homeAnimation()
    socket.emit("exitMultiplayer", localStorage.getItem("username"))
  }, [])
  let history = useHistory();

  return (
    <Grid container spacing={2} className="App">
      <Grid item xs={1}></Grid>
      <Grid item xs={6}>
      <BotDifficultyModal open={open} setOpen={setOpen}/>
        <Typography variant="h1" sx={{ mt: 10,mb:10 }}>Uno Clone</Typography>
        <Item sx={{ bgcolor: 'info.main' }}>
        <div className="startBtn" onClick={()=>{setOpen(true)}}>
            Single Player
          </div>
        </Item>
        <Item sx={{ bgcolor: 'secondary.main' }}>
          <div className="startMultiBtn" onClick={()=>history.push("./createroom")}>
            Multiplayer
          </div>
        </Item>
        <Item sx={{ bgcolor: 'error.main' }}>
          <div className="leaderBoardBtn" onClick={()=>history.push("./leaderboard")}>
            LeaderBoard
          </div>
        </Item>
        <Item sx={{ bgcolor: 'success.main' }}>
          <div className="profileBtn" onClick={()=>history.push("./profile")}>
            Profile
          </div>
        </Item>
      </Grid>
    </Grid>
  );
}

export default Home;