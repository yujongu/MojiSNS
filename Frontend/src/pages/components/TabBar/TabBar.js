import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Avatar } from '@mui/material'
import { color, fontWeight, textAlign } from '@mui/system'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import FeedIcon from '@mui/icons-material/Feed';
import { Tab } from '@mui/material';
import { Tabs } from '@mui/material';
import { Box } from '@mui/system';
import { PropTypes } from 'prop-types';

import TopicView from '../TopicView/TopicView';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const TabBar = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab icon={<Avatar alt="default profile" src="/emoji.png" sx={{
                        width: 150,
                        height: 150,
                        mx: "auto"
                    }} />} label="Profile" {...a11yProps(0)} />
                    <Tab icon={<ConnectWithoutContactIcon sx={{
                        width: 120,
                        height: 120,
                        mx: "auto",
                        color: "#6a6a6a"
                    }} />} label="Follower" {...a11yProps(1)} />
                    <Tab icon={<ConnectWithoutContactIcon sx={{
                        width: 120,
                        height: 120,
                        mx: "auto",
                        color: "#000000"
                    }} />} label="Following" {...a11yProps(2)} />
                    <Tab icon={<FeedIcon sx={{
                        width: 120,
                        height: 120,
                        mx: "auto",
                        color: "#000000"
                    }} />} label="Posting" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                        <TopicView />
                    </Grid>
                </Grid>
            </TabPanel>
        </Box>
    )
}

export default TabBar