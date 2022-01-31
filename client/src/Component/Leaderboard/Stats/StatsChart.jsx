//@ts-nocheck
import React, { PureComponent, useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { LineChart, ComposedChart, Bar, Line, LabelList, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../../OtherComponents/LoadingComponent/Loader';

const DisplayStatisticsData = () => {
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
            let tmpIndex = 0;

            for (let i = 0; i < score.length; i++) {
                const theDate = new Date(score[i].created_at);
                const formattedDate = theDate.getDate() + '/' + (theDate.getMonth() + 1) + '/' + theDate.getFullYear();

                console.log("i:", i);
                console.log("toUpload:", toUpload);

                if (i === 0) {
                    toUpload.push({
                        date: formattedDate,
                        score: score[i].score,
                        noOfGames: tmpIndex + 1
                    });
                    console.log("toUpload (i===0):", toUpload);
                } else {
                    let status = false;
                    for (let x = 0; x < toUpload.length; x++) {
                        if (toUpload[x].date === formattedDate) {
                            toUpload[x].date = formattedDate;
                            toUpload[x].score += score[i].score;
                            toUpload[x].noOfGames += 1;

                            console.log("toUpload (edit):", toUpload);
                            status = true;
                            break;
                        }
                    }

                    if (status === false) {

                        toUpload.push({
                            date: formattedDate,
                            score: score[i].score,
                            noOfGames: 1
                        });

                        console.log("toUpload (push):", toUpload);

                    }
                }

            };

            for (let y = 0; y < toUpload.length; y++) {
                toUpload[y].score = Math.floor(toUpload[y].score / toUpload[y].noOfGames);
            };

            setData(toUpload);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
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
                <Legend verticalAlign='top' />
                <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} >
                    {/* <LabelList dataKey="Avg. Score" position="top" offset={15} /> */}
                </Line>
                <Line type="monotone" dataKey="noOfGames" stroke="#0f0f0f">
                    {/* <LabelList dataKey="No. of Games" position="top" offset={15} /> */}
                </Line>

            </LineChart>
        </ResponsiveContainer>
    );
}

export default DisplayStatisticsData;