import React, {useState} from 'react';
import './App.css';
import LandingPageComponent from './LandingPageComponent';
import SavingsGoalComponent from './SavingsGoalComponent';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

export default function App() {
  const [isShowingHome, setIsShowingHome] = useState(true);
  const [isShowingGoals, setIsShowingGoals] = useState(false);

  const clickHandler = (e) => {
    if(e.target.id === 'home') {
      setIsShowingHome(true);
      setIsShowingGoals(false);
    } else if (e.target.id === 'savingsGoal') {
      setIsShowingHome(false);
      setIsShowingGoals(true);
    }
  }

  return (
    <div className="App">
      <Router>
        <div className='navigation'>
          <ListGroup horizontal>
            <ListGroup.Item variant='dark'>
              <Link id='home' to='/' onClick={(e) => clickHandler(e)}>Home</Link>
            </ListGroup.Item>
            <ListGroup.Item variant='dark'>
              <Link id='savingsGoal' to='/savingsGoal' onClick={(e) => clickHandler(e)}>Goals</Link>
            </ListGroup.Item>
          </ListGroup>
        </div>
        {(isShowingHome) && <Route path='/' render={() => <LandingPageComponent />} />}
        {(isShowingGoals) && <Route path='/savingsGoal' render={() => <SavingsGoalComponent />}/>}
      </Router>
    </div>
  );
}
