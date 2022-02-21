import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import DoneIcon from '@mui/icons-material/Done'
import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#c5742a',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#10A800',
      contrastText: '#ffffff'
    },
  },
  typography: {
    fontFamily: [
      'Roboto Condensed',
      'Oswald',
      'Noto Sans',
      'Ubuntu',
      'Roboto Mono',
    ].join(','),
  }
})


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const TopicView = () => {

  //Sample data for topics
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Sports' },
    { key: 1, label: 'Games' },
    { key: 2, label: 'Beauty' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Movies' },
  ]);

  const [chipData2, setChipData2] = React.useState([
    { key: 5, label: 'Assignment' },
    { key: 6, label: 'Purdue' },
  ]);


  const handleDelete = (chipToDelete) => () => {
    setChipData2([...chipData2, chipToDelete])
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleClick = (chipToAdd) => () => {
    setChipData([...chipData, chipToAdd]);
    setChipData2((chips) => chips.filter((chip) => chip.key !== chipToAdd.key));
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            Available Topics
          </Typography>
          <Paper elevation={6}
            sx={{
              backgroundColor: '#FFBB29'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >

              {chipData2.map((data) => {
                let icon;

                //Addition of icon on React
                if (data.label === 'React') {
                  icon = <TagFacesIcon />;
                }

                return (
                  <ListItem key={data.key}>
                    <Chip
                      icon={icon}
                      label={data.label}
                      onDelete={handleClick(data)}
                      deleteIcon={<DoneIcon />}
                      color="primary"
                    />
                  </ListItem>
                );
              })}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            Selected Topics
          </Typography>
          <Paper elevation={6}
            sx={{
              backgroundColor: '#70FF00'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >

              {chipData.map((data) => {
                let icon;

                //Addition of icon on React
                if (data.label === 'React') {
                  icon = <TagFacesIcon />;
                }

                return (
                  <ListItem key={data.key}>
                    <Chip
                      icon={icon}
                      label={data.label}
                      onDelete={handleDelete(data)}
                      color="secondary"
                    />
                  </ListItem>
                );
              })}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default TopicView