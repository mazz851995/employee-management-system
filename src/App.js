import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Employee from './components/Employee';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Leaves from './components/Leaves';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_EMPLOYEES" });
    dispatch({ type: "GET_LEAVES" });
  }, [dispatch])

  return (
    <div className="bg">
      <ToastContainer />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={() => <Employee />} />
          <Route exact path="/leaves" component={() => <Leaves />} />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
