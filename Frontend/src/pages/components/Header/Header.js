import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
    }
})



const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    height: 30
                }}
            >
            </Box>
            <Grid container>
                <Grid item xs={11}>
                    <Typography variant='h4' align='left'
                        sx={{
                            color: 'primary'
                        }}
                    >
                        Welcome to Moji!
                    </Typography>
                </Grid>
                <Grid item xs>
                    <div>
                        <Button
                            color='secondary'
                            variant='contained'
                            onClick={handleClick}
                        >
                            Settings
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={handleClose}>This</MenuItem>
                            <MenuItem onClick={handleClose}>Could</MenuItem>
                            <MenuItem onClick={handleClose}>Be anything</MenuItem>
                        </Menu>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default Header