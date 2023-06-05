import React, {useState} from 'react';
import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import { signInWithGoogle } from '../Firebase';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { Button } from './Button';
import CreateAccount from './pages/AccountCreation';
import { FcGoogle } from 'react-icons/fc';


const Login = () => {
  const [EmailID, setEmailID] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  /*
  -Username and Password taken in from the input 
  -DEFAULT VALUES: Username = '', Password = ''. 
  -If nothing is entered into a particular field, Example - the user only enters a username and no password, 
  then Username stores the inputted value, and password is set to null. 
  -Use either Username = null or Password = null to check for incorrectly formatted Username/Password input
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, EmailID, Password);
      navigate('/');
// ...
    } catch (error) {
      alert('Invalid login details');
      window.location.reload(false);
    }
  };

  return (
    <React.Fragment>
      <div className='login_page'>
        <div className='login_container'>
          <img className='login_house_logo' src={process.env.PUBLIC_URL + './images/login-key.png'} alt = "Login-House" />
          {/*For a form element, hitting enter on either input field will result in form submission. Classname defined for future css styling.*/}
          {/* <img src= {process.env.PUBLIC_URL + './images/logo.png'} alt = "BruinLeasy logo"/> */}
          <div className='login_submission'>
            <form classname = "login_form" onSubmit={handleSubmit}> 
            {
              /*
              -onChange is a pre-defined prop that defines what is to be done when changes are made to the corresponding
              input field. 
              -In this case, it calls a funcion defined in-line with an event object. 
              -The event object stores the information corresponding to the change, and is automatically created whenever
              such changes are made by the user. 
              -One of the properties of the event is 'target' which is an object that corresponds to the specific field 
              that was changed(i.e. the specific input field that was modified)
              -'Value' is a property of target that stores the changes made to the input fields value. 
              */
            }
            <img class='login_logo_pic' src={process.env.PUBLIC_URL + './images/logo.png'} alt = "Logo" />
            <input className='login_box' type = "email" placeholder = "Email" onChange = {(event)=>{setEmailID(event.target.value)}} value = {EmailID}/>
            <br />
            <input className='login_box' type = "password" placeholder = "Password" onChange = {(event)=>{setPassword(event.target.value)}} value = {Password}/>
            <br />
            {
              /*
              -Whenever a button is defined by default within a form tag, it is automatically treated as a submit button.
              -Clicking on this button will submit the form.
            */
            }
            <div className='submit'>
            <button className='btn--outline--medium'>Submit</button>
            </div>
            </form>
            <div className='login_btns'>
              <button className='btn--outline--small' onClick={signInWithGoogle}><FcGoogle className='fcGoogle'/>   Sign in with Google</button> <br />
              <Link to='/CreateAccount'> 
                <button className='btn--outline--small'>New? Create An Account</button>
              </Link>
            </div>
          </div>
        </div>
    </div>
    </React.Fragment>
  );
}

export default Login;
