import React from 'react'
import { Grid } from '@mui/material'
const Follower = () => {
    return (
        <Grid container>
            <Grid item xs={3}>
                Profile
            </Grid>
            <Grid item xs={3}>
                Follower
            </Grid>
            <Grid item xs={3}>
                Following
            </Grid>
            <Grid item xs={3}>
                Posting
            </Grid>
        </Grid>
    )
}

export default Follower