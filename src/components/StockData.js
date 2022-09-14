import {useState, useEffect} from 'react';
import finnHub from '../apis/finnHub';


export const StockData = ({ symbol }) => {

    const [stockData, setStockData] = useState();

    let isMounted = true;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/stock/profile2", {
                    params: {
                        symbol
                    }
                })
                if(isMounted) {
                    setStockData(response.data);
                }

            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
        return () => { isMounted = false };
    }, [symbol])

    console.log(stockData);

    return (
        <div>
            {stockData && ( 
                <div className="row border bg-white rounded shadow-sm p-4 mt-5">
                    <div className="col">
                        <div>
                            <span className="fw-bold">name: </span>
                            <span>{stockData.name}</span>
                        </div> 
                        <div>
                            <span className="fw-bold">country: </span>
                            <span>{stockData.country}</span>
                        </div> 
                        <div>
                            <span className="fw-bold">ticker: </span>
                            <span>{stockData.ticker}</span>
                        </div> 
                    </div>
                    <div className="col">
                        <div>
                            <span className="fw-bold">Exchange: </span>
                            <span>{stockData.exchange}</span>
                        </div> 
                        <div>
                            <span className="fw-bold">Industry: </span>
                            <span>{stockData.finnhubIndustry}</span>
                        </div> 
                        <div>
                            <span className="fw-bold">IPO: </span>
                            <span>{stockData.ipo}</span>
                        </div> 
                    </div>
                    <div className="col">
                    <div>
                            <span className="fw-bold">MarketCap: </span>
                            <span>{stockData.marketCapitalization}</span>
                        </div> 
                        <div>
                            <span className="fw-bold">Shares Outstanding: </span>
                            <span>{stockData.shareOutstanding}</span>
                        </div> 
                        <div>
                            <span className="fw-bold">url: </span>
                            <a href={stockData.weburl}>{stockData.weburl}</a>
                        </div> 
                    </div> 
                </div>  
            )}
        </div>
    )
}