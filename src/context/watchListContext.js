import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {

    const [watchList, setWatchList] = useState(localStorage.getItem("watchList")?.split(",") || ["AAPL", "MSFT", "TSLA", "FB", "AMZN"]);

    useEffect(() => {
        localStorage.setItem("watchList", watchList);
    }, [watchList]);

    const addStock = (stock) => {
        if(watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock]);
        }
    }

    const deleteStock = (stock) => {
        setWatchList(watchList.filter((item) => item !== stock));
    }

    return (
        <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
            {props.children}
        </WatchListContext.Provider>
    )
}
