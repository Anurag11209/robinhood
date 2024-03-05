// https://github.com/lxndroc/react-robinhood-clone

import React, { useState, useEffect } from 'react';
import './Stats.css';
import axios from 'axios';
import StatsRow from './StatsRow';
import { db } from './firebase';
import { MoreHoriz } from '@material-ui/icons';

const BASE_URL = 'https://finnhub.io/api/v1/quote';
// following value to be replaced from finnhun.io
const TOKEN = 'clflv11r01qnc0ne9ga0';
const testData = [];

function Stats() {
  const [stockData, setStockData] = useState([]);
  const [myStocks, setMyStocks] = useState([]);

  const getMyStocks = () => {
    db.collection('myStocks').onSnapshot(snapshot => {
      let promises = [];
      let tempData = [];
      snapshot.docs.map(doc => {
        // console.log(doc.data());
        promises.push(
          getStocksData(doc.data().ticker).then(res => {
            tempData.push({
              id: doc.id,
              data: doc.data(),
              info: res.data,
            });
          })
        );
      });
      Promise.all(promises).then(() => {
        setMyStocks(tempData);
      });
    });
  };

  const getStocksData = stock => {
    return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch(error => {
        console.error('Error', error.message);
      });
  };

  useEffect(() => {
    let tempStocksData = [];
    const stocksList = [
      'AAPL',
      'MSFT',
      'TSLA',
      'FB',
      'BABA',
      'UBER',
      'DIS',
      'SBUX',
    ];

    // getMyStocks();
    let promises = [];
    stocksList.map(stock => {
      promises.push(
        getStocksData(stock).then(res => {
          console.log(res);
          tempStocksData.push({
            // testData.push({
            name: stock,
            ...res.data,
          });
        })
      );
    });

    Promise.all(promises).then(() => {
      setStockData(tempStocksData);
      // setStockData(testData);
      console.log(testData);
    });
  }, []);

  return (
    <div className='stats'>
      <div className='stats__container'>
        <div className='stats__header'>
          <p>Stocks</p>
          <MoreHoriz />
        </div>
        <div className='stats__content'>
          <div className='stats__rows'>
            {/* our current stocks */}
            {myStocks.map(stock => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                price={stock.info.c}
                shares={stock.data.shares}
              />
            ))}
          </div>
        </div>
        <div className='stats__header stats-lists'>
          <p>Lists</p>
        </div>
        <div className='stats__content'>
          <div className='stats__rows'>
            {/* stocks we can buy */}
            {stockData.map(stock => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
