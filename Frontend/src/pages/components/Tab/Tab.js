import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Avatar } from '@mui/material'
import { color, fontWeight, textAlign } from '@mui/system'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import FeedIcon from '@mui/icons-material/Feed';


const Tab = (props) => {
    const pathName = props.location.pathName
    
    return (
        <Grid container>
            <Grid item xs={3}>
                <Avatar alt="Default Emoji" src="/emoji.png" onClick={event => window.location.href = "profile"}
                    sx={{
                        width: 150,
                        height: 150,
                        mx: "auto"
                    }} />
                <Typography gutterBottom
                    sx={{
                        fontSize: 15,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}
                >
                    Profile
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Avatar onClick={event => window.location.href = "follower"}
                    sx={{
                        width: 150,
                        height: 150,
                        mx: "auto"
                    }}
                >
                    <ConnectWithoutContactIcon
                        sx={{
                            width: 120,
                            height: 120,
                            mx: "auto",
                            color: "#6a6a6a"
                        }}
                    />
                </Avatar>
                <Typography gutterBottom
                    sx={{
                        fontSize: 15,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}
                >
                    Follower
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Avatar onClick={event => window.location.href = "following"}
                    sx={{
                        width: 150,
                        height: 150,
                        mx: "auto"
                    }}
                >
                    <ConnectWithoutContactIcon
                        sx={{
                            width: 120,
                            height: 120,
                            mx: "auto",
                            color: "#000000"
                        }}
                    />
                </Avatar>
                <Typography gutterBottom
                    sx={{
                        fontSize: 15,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}
                >
                    Following
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Avatar onClick={event => window.location.href = "posting"}
                    sx={{
                        width: 150,
                        height: 150,
                        mx: "auto"
                    }}
                >
                    <FeedIcon
                        sx={{
                            width: 120,
                            height: 120,
                            mx: "auto",
                            color: "#000000"
                        }}
                    />
                </Avatar>
                <Typography gutterBottom
                    sx={{
                        fontSize: 15,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}
                >
                    Posting
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Tab