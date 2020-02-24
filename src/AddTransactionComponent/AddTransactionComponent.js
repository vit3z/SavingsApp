import React, { useState } from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import * as actionTypes from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function AddTransactionComponent(props) {
  const data = useSelector(state => state.currentData);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const [receiverName, setReceiverName] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isValidFee, setIsValidFee] = useState(false);

  const showModalHandle = () => setShowModal(true);
  const hideModalHandle = () => setShowModal(false);

  const updateDataAndRoundup = () => {
    console.log('DATA: ', data);  
    let id = data.length + 1
    let newData = {
      id,
      receiver: receiverName,
      amount
    };

    data.push(newData);
    dispatch({type: actionTypes.SET_DATA, payload: data});
    props.increaseTransactionAmounts();
    
    setAmount(0);
    setShowModal(false);
    console.log('DATA: ', data);
  }

  /* If the input is not a number or decimal dot, don't show the submit button */
  const validateFeeInput = (fee) => {
    if(!isNaN(fee)) {
      setAmount(fee)
      setIsValidFee(true);
    } else {
      setIsValidFee(false);
    }
  }

  return (
    <div>
      <Button onClick={showModalHandle}>Add Transaction</Button>

      <Modal show={showModal} onHide={hideModalHandle}>
        <Modal.Header closeButton>
          <Modal.Title>Add A Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text id='inputGroup-sizing-default'>Transaction Receiver</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label='Default' aria-describedby='inputGroup-sizing-default' onChange={(e) => setReceiverName(e.target.value)}/>
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Text id='inputGroup-sizing-default'>Transaction Fee (&pound;)</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl aria-label='Default' aria-describedby='inputGroup-sizing-default' onChange={(e) => validateFeeInput(e.target.value)}/>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => {
            setAmount(0);
            setShowModal(false);
          }}>Cancel</Button>
          {isValidFee && <Button variant='primary' onClick={() => updateDataAndRoundup()}>Submit</Button>}
        </Modal.Footer>
      </Modal>
    </div>
  )
}