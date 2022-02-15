import './App.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Posts from './pages/Posts/Posts';


function App() {
  return (
    <div className="App">
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12} md={4} lg={3} style={{backgroundColor: 'blue'}}>
            abc
            {/* <Profile /> */}
          </Grid>
          <Grid item xs style={{backgroundColor: 'red'}}>
            def
            {/* <Header />
            <Posts />
            <Footer /> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
