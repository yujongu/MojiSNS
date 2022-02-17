import React from 'react'
import { Container, Grid } from '@mui/material'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/material';

import Header from './components/Header/Header'
import Follower from './components/Follower/Follower';
import TopicView from './components/TopicView/TopicView';

const useStyles = makeStyles({
  root: {
      background: '#CCCCCC'
  }
  }
)

const Homeweb = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Grid container>
          <Grid item xs={12} >
            <Header />
          </Grid>
          <Grid item xs={12} style={{ backgroundColor: 'purple' }}>
            <Follower />
          </Grid>
          <Grid item xs={12} style={{ backgroundColor: 'yellow' }}>
            <TopicView />
          </Grid>
          <Grid item xs={9} style={{ backgroundColor: 'red' }}>
            Posts
          </Grid>
          <Grid item xs style={{ backgroundColor: 'green' }}>
            Profile
          </Grid>
        </Grid>
        <Box>
          <Fab color="secondary" aria-label="edit">
            <EditIcon />
          </Fab>
        </Box>
      </Container>
    </div>
  )
}

export default Homeweb