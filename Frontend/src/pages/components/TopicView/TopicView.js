import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#c5742a',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#959595'
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

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <div>
            wow
          </div>
        </Grid>
        <Grid item xs={12}>
          <Paper
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
                  />
                </ListItem>
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default TopicView