import React from 'react'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/private-theming';
import { Container } from '@mui/material';

import Header from './components/Header/Header'


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#c5742a',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#f50057',
    },
  }
})

const Homeweb = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container>

      </Container>
    </ThemeProvider>
  )
}

export default Homeweb