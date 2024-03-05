// https://github.com/lxndroc/react-robinhood-clone

import React from 'react';
import './StatsRow.css';
import StockSVG from './stock.svg';
import { db } from './firebase';

function StatsRow({ name, openPrice, price, shares = 0 }) {
  // console.log("Props: ", props);
  const percentage = ((price - openPrice) / openPrice) * 100;
  const buyStock = () => {
    console.log('log', name);
    db.collection('myStocks')
      .where('ticker', '==', name)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          //update the record
          querySnapshot.forEach(doc => {
            db.collection('myStocks')
              .doc(doc.id)
              .update({
                shares: (doc.data().shares += 1),
              });
            // console.log(doc.id, ' => ', doc.data());
          });
        }
        // add a new record
        else
          db.collection('myStocks').add({
            ticker: name,
            shares: 1,
          });
      });
  };

  return (
    <div className='statsrow'>
      <div className='statsrow__intro'>
        <h1>{name}</h1>
        <p>{shares && shares + ' shares'}</p>
      </div>
      <div className='statsrow__chart'>
        <img src={StockSVG} height={16} />
      </div>
      <div className='statsrow__numbers'>
        <p className='statsrow__price'>{price}</p>
        <p className='statsrow__percentage'> +{Number(percentage).toFixed(2)}%</p>
      </div>
    </div>
  );
}

export default StatsRow;
