import * as React from 'react'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/private-theming';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

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


const Header = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        Hello
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
}

export default Header