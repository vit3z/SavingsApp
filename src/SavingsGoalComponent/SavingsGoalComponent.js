import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import * as actionTypes from '../store/actions';
import { Button, Modal, InputGroup, FormControl, Card, ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './savingsGoalComponent.css';

export default function SavingsGoalComponent() {
  const currentGoalsRedux = useSelector(state => state.currentGoals);
  const currentRoundup = useSelector(state => state.currentRoundup);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [goalName, setGoalName] = useState(null);
  const [goalBudget, setGoalBudget] = useState(null);
  const [numberOfGoals, setNumberOfGoals] = useState(0);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setNumberOfGoals(currentGoalsRedux.length);
  });

  const clickHandler = (e) => {
    if(e.target.id === 'addSavingsGoal') {
      setShowModal(true);
    } else if (e.target.id === 'saveSavingsGoal') {
      let currentGoals = currentGoalsRedux;
      // Generates a randomized ID for the goal (a-z, 0-9)
      let goalId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      let savingGoal = {
        id: goalId,
        goalName,
        goalBudget
      };

      // If the Goal Name is left empty, it will save a default name
      if(savingGoal.goalName === null) {
        savingGoal.goalName = 'DefaultName';
      }

      // The Goal is saved in the Redux store
      currentGoals.push(savingGoal);
      dispatch({type: actionTypes.SET_GOAL, payload: currentGoals});
      closeModal();
    } else if (e.target.id === 'cancelSavingsGoal') {
      closeModal();
    }
  }

  const closeModal = () => {
    setShowModal(false);
    setGoalName(null);
    setGoalBudget(null);
  }

  const changeGoal = (e) => {
    setGoalName(e.target.value);
  }

  const changeBudget = (e) => {
    if(!isNaN(e.target.value) || e.target.value === null) {
      setGoalBudget(e.target.value);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  // Deletes a goal by comparing the ButtonID with the GoalID; it also removes the goal from the Redux store
  const deleteGoal = (e) => {
    let savingGoals = currentGoalsRedux;
    
    let splittedString = e.target.id.split('_');
    let indexOfId = 0;

    if(savingGoals.length > 1) {
      indexOfId = savingGoals.map((goal, index) => {
        if(goal.id === splittedString[1]) {
          return index;
        }
      }).filter(item => {return item})[0];
    } else {
      indexOfId = 0;
    }

    savingGoals.splice(indexOfId, 1);
    dispatch({type: actionTypes.SET_GOAL, payload: savingGoals});
    setNumberOfGoals(currentGoalsRedux.length);
  }

  let savingGoals = currentGoalsRedux;
  return <div>
    <Button variant='success' id='addSavingsGoal' onClick={(e) => clickHandler(e)}>Add Savings Goal</Button>

    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Goal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text id='inputGroup-sizing-default'>Savings Goal</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label='Default' aria-describedby='inputGroup-sizing-default' onChange={(e) => changeGoal(e)}/>
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <OverlayTrigger 
              key='budgetOverlay' 
              placement='top' 
              overlay={
                <Tooltip id='tooltip-budget'>
                  Numbers only
                </Tooltip>
            }>
              <InputGroup.Text id='inputGroup-sizing-default'>Budget Needed (&pound;)</InputGroup.Text>
            </OverlayTrigger>
          </InputGroup.Prepend>
          <FormControl aria-label='Default' aria-describedby='inputGroup-sizing-default' onChange={(e) => changeBudget(e)}/>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' id='cancelSavingsGoal' onClick={(e) => clickHandler(e)}>Cancel</Button>
        {isValid && <Button variant='primary' id='saveSavingsGoal' onClick={(e) => clickHandler(e)}>Save</Button>}
      </Modal.Footer>
    </Modal>
    <div className='cardsContainer'>
      {savingGoals.map(goal => {
        return (
          <Card style={{width: '18em' }} bg='secondary' text='white' key={goal.id} className='savingsGoalCard'>
            <Card.Img variant="top" src={`https://picsum.photos/seed/${goal.id}/286`} />
            <Card.Body>
              <Card.Title>{goal.goalName}</Card.Title>
              <Card.Text>
                Set budget: {goal.goalBudget}&pound;
                <br />
                Current budget: {currentRoundup}&pound;
                <ProgressBar animated variant="success" now={(currentRoundup/goal.goalBudget)*100} label={`${(Math.round((currentRoundup/goal.goalBudget)*100))}%`} />
              </Card.Text>
              <Button variant='danger' id={'deleteGoal_' + goal.id} onClick={(e) => deleteGoal(e)}>Delete</Button>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  </div>
}
