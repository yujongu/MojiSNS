import React from 'react'
import { Container, Grid } from '@mui/material'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/material';

import Header from './components/Header/Header'
import Tab from './components/Tab/Tab';
import TopicView from './components/TopicView/TopicView';

const Homeweb = () => {
  return (
    <Box
    sx={{
      backgroundColor: '#CCCCCC'
    }}
    >
      <Container>
        <Grid container rowSpacing={3}>
          <Grid item xs={12} >
            <Header />
          </Grid>
          <Grid item xs={12}>
            <Tab />
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
    </Box>
  )
}

export default Homeweb