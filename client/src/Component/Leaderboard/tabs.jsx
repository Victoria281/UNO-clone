import * as React from 'react';
import { Suspense } from 'react';

// Type Imports
import PropTypes from 'prop-types';

// MUI Material Library Imports
import { Tab, Tabs, Typography, Box } from '@mui/material';

// Other Imports
import Loader from '../OtherComponents/LoadingComponent/Loader';
import DisplayStatsData from './Stats/Statistics';
import DisplayLeaderboard from './Ranks/Leaderboard';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

// a11yProps = accessibility props
const a11yProps = (index) => {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
};

const LeaderboardTab = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (evt, newVal) => {
        setValue(newVal);
    };

    return (
        <Box sx={{ width: '100%', padding: 5 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aira-label="Leaderboard Tabs">
                    <Tab label="Leaderboard" {...a11yProps(0)} />
                    <Tab label="My Statistics" {...a11yProps(1)} />
                </Tabs>
            </Box>

            {/* Leaderboard Tab */}
            <TabPanel value={value} index={0}>
                <Suspense fallback={<Loader />}>
                    <DisplayLeaderboard />
                </Suspense>
            </TabPanel>

            {/* Statistics Tab */}
            <TabPanel value={value} index={1}>
                <Suspense fallback={<Loader />}>
                    <DisplayStatsData />
                </Suspense>
            </TabPanel>

        </Box>
    )
};

export default LeaderboardTab;