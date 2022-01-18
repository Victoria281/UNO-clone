import * as React from 'react';
import { Suspense } from 'react';
import { useDispatch } from 'react-redux';

// Type Imports
import PropTypes from 'prop-types';

// MUI Material Library Imports
import { Tab, Tabs, Typography, Box } from '@mui/material';

// Other Imports
import Loader from '../OtherComponents/LoadingComponent/Loader';
import DisplayStatsData from './Stats/Statistics';
import DisplayLeaderboard from './Ranks/Leaderboard';
import { updateCurrentUserStats } from '../../store/action/leaderboard/stats';
import { getTop30Players } from '../../store/action/leaderboard/leaderboard';

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

/**
 * Checks the localStorage for the token and userId set when the user logs in.
 * If the token and userId are found, an action is dispatched to the store to
 * fetch the user's information and thereafter store it inside the store.
 */
const GetStatsData = () => {
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    let userInfo = {
        userId: 0,
        token: "",
    };

    if (userId !== null && token !== null) {
        userInfo = {
            userId: parseInt(userId),
            token: token,
        };

        console.log("running!");

        dispatch(updateCurrentUserStats(userInfo))
        dispatch(getTop30Players());
    }
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

            {GetStatsData()}

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