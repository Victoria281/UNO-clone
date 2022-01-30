//@ts-nocheck
import React, { PureComponent, useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { LineChart, ComposedChart, Bar, Line, LabelList, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../OtherComponents/LoadingComponent/Loader';

const DisplayStatsData = () => {
    const [data, setData] = useState([]);
    const userStats = useSelector(
        /**
         * Selector function to get the user's statistics from the store
         * 
         * @param {RootState} state 
         * Takes in the state of the store
         * 
         * @returns 
         * Returns the user's statistics from the store
         */
        (state) => state.profile_info.userStats
    );

    const loadData = () => {
        // console.log(userStats);
        let score = userStats.score;

        if (score.length > 0) {
            let toUpload = [];
            let tmpDate = '';
            let tmpIndex = -1;

            for (let i = 0; i < score.length; i++) {
                const theDate = new Date(score[i].created_at);
                const formattedDate = theDate.getDate() + '/' + (theDate.getMonth() + 1) + '/' + theDate.getFullYear();
                if (tmpDate !== formattedDate) {
                    tmpDate = formattedDate;
                    tmpIndex++;

                    toUpload.push({
                        date: formattedDate,
                        score: score[i].score,
                        noOfGames: i + 1
                    });
                } else {
                    console.log("..", toUpload);

                    toUpload[tmpIndex].score += score[tmpIndex].score;
                    toUpload[tmpIndex].noOfGames++;
                }

            };
            
            // console.log("chart:", toUpload);
            setData(toUpload);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Suspense fallback={<Loader />}>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 15,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date">
                        <Label value="Date" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                        <Label value="Score" angle={-90} position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    
                    <Bar dataKey="score"  barSize={20} fill='#8884d8'>
                        <LabelList dataKey="score" position="top"/>
                    </Bar>
                    <Line type="monotone" dataKey="noOfGames" stroke="#0000FF" />
                </ComposedChart>
            </ResponsiveContainer>
        </Suspense>

    );
}

export default DisplayStatsData;