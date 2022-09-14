import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import finnHub from '../apis/finnHub';
import { StockChart } from '../components/StockChart';
import { StockData } from '../components/StockData';

const formatData = (data) => {
    return data.t.map((el, index) => {
        return {
            x: el * 1000,
            y: Math.floor(data.c[index])
        }
    })
}

export const StockDetailPage = () => {

    const {symbol} = useParams();

    const [chartData, setChartData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date()
            const currentTime = Math.floor(date.getTime()/1000);

            let Days;

            if(date.getDay() === 6) {
                Days = currentTime - 60*60*24*2;
            } else if(date.getDay() === 0) {
                Days = currentTime - 60*60*24*3;
            } else {
                Days = currentTime - 60*60*24;
            }

            const oneWeekAgo = currentTime - 60*60*24*7
            const oneYearAgo = currentTime - 60*60*24*365

            try {
                const responses = await Promise.all([finnHub.get("/stock/candle", {
                    params: {
                        symbol: symbol,
                        resolution: 30,
                        from: Days,
                        to: currentTime,
                    }
                }), finnHub.get("/stock/candle", {
                    params: {
                        symbol: symbol,
                        resolution: 60,
                        from: oneWeekAgo,
                        to: currentTime,
                    }
                }), finnHub.get("/stock/candle", {
                    params: {
                        symbol: symbol,
                        resolution: "W",
                        from: oneYearAgo,
                        to: currentTime,
                    }
                })])

                setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    year: formatData(responses[2].data)
                })

            } catch (error) {
                console.log(error);
            }

        }
        fetchData();
        
    }, [symbol])


    return (
        <div>
            {chartData && (
                <div>
                    <StockChart chartData={chartData} symbol={symbol} />
                    <StockData symbol={symbol} />
                </div>
            )}
        </div>
    );
}