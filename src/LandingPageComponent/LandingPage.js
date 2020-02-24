import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import * as actionTypes from '../store/actions';
import { useDispatch, useSelector  } from 'react-redux';
import './landingPage.css';
import AddTransactionComponent from '../AddTransactionComponent';

export default function LandingPage() {
  const initialCustomerData = [
    {
      id: 1,
      receiver: 'Company1',
      amount: 4.35
    },
    {
      id: 2,
      receiver: 'Company2',
      amount: 5.20
    },
    {
      id: 3,
      receiver: 'Company1',
      amount: 0.87
    }
  ];
  const roundup = useSelector(state => state.currentRoundup);
  const data = useSelector(state => state.currentData);

  const dispatch = useDispatch();
  
  const [customerData, customerDataSet] = useState([]);
  const [totalAmount, totalAmountSet] = useState(0);
  const [totalTransactions, totalTransactionsSet] = useState(customerData.length);
    
  useEffect(() => {
    //const token = 'tokenString';
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //const url = 'endpoint-domain.com';
    //const completeUrl = proxyUrl+url;

    if(data.length > 0) {
      customerDataSet(data);
    } else {
      customerDataSet(initialCustomerData);
    }

    totalTransactionsSet(customerData.length)

    if(customerData.length > 0 && totalAmount === 0) {
      dispatch({type: actionTypes.SET_DATA, payload: customerData});
      calculateValueForSaving();
    }
  });

  const calculateValueForSaving = () => {
    let roundupTotalAmount = 0;
    let iteratedVal;
    let ceiledVal;
    let diffVal;

    for(let i = 0; i < customerData.length; i++) {
      iteratedVal = customerData[i].amount;
      ceiledVal = Math.ceil(iteratedVal);

      diffVal = ceiledVal - iteratedVal;

      roundupTotalAmount += diffVal;
    }
    roundupTotalAmount = Math.round(roundupTotalAmount * 100) / 100;
    totalAmountSet(roundupTotalAmount);

    dispatch({type: actionTypes.SET_ROUNDUP, payload: roundupTotalAmount});
  }

  const increaseTransactionAmounts = () => {
    totalTransactionsSet(customerData.length);
    calculateValueForSaving();
  }

  return (
    <div>
      <p className='customerName'>Hello Jimmy</p>
      <div className='tableDiv'>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Company Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map(data => {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.receiver}</td>
                  <td>{data.amount}&pound;</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <p className='totalRoundup'>Total Roundup for this week: {roundup}&pound;</p>
        <AddTransactionComponent increaseTransactionAmounts={() => increaseTransactionAmounts()}/>
      </div>
    </div>
  )
}
