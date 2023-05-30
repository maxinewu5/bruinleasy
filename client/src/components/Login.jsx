import React from 'react';
import { useState } from 'react';

import { signInWithGoogle } from '../Firebase';

function Login() {
  /*
  -Username and Password taken in from the input 
  -DEFAULT VALUES: Username = null, Password = null. 
  -If nothing is entered into a particular field, Example - the user only enters a username and no password, 
  then Username stores the inputted value, and password is set to null. 
  -Use either Username = null or Password = null to check for incorrectly formatted Username/Password input
  */
  const [Username, setUsername] = useState(null);
  const [Password, setPassword] = useState(null);

  const submit = () => {
    alert("Username: " + Username + "\nPassword: " + Password)
  }

  return (
    <React.Fragment>
    {/*For a form element, hitting enter on either input field will result in form submission. Classname defined for future css styling.*/}
    <img src= {process.env.PUBLIC_URL + './images/logo.png'} alt = "BruinLeasy logo"/>
    <form classname = "Login-Form" onSubmit={submit}> 
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
    <input placeholder = "Username" onChange = {(event)=>{setUsername(event.target.value)}} value = {Username}/>
    <br />
    <input placeholder = "Password" onChange = {(event)=>{setPassword(event.target.value)}} value = {Password}/>
    <br />
    {
      /*
      -Whenever a button is defined by default within a form tag, it is automatically treated as a submit button.
      -Clicking on this button will submit the form.
    */
    }
    <button>Submit</button>
    <br></br>
    <br />
    </form>

    <button onClick={signInWithGoogle}>Sign in with Google</button>
    
    </React.Fragment>
  );
}

export default Login;
