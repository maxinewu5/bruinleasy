import React, {useState} from "react";
import { signInWithGoogle, auth } from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {getFirestore, collection, doc, setDoc} from "firebase/firestore"

export default function CreateAccount()
{
    /* These variables are used to store the name, email ID, and password entered by the user when they create an account */
    const [EmailID, setEmailID] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    //useNavigate is used to navigate to the home page if login is successful. 
    const navigate = useNavigate();

    //function is defined as async since it must access the database which must be awaited. 
    const submit = async(event) => {
      /*
      allows us to override default behaviour during form submission which allows us to 
      access the database in the meantime, and produce the desried effect of pushing
      data to the database.
      */

      event.preventDefault();
      //if either the name or password was not entered, prompt the user for it
      //ASSUMES THAT THE EMAIL INPUTTED IS VALID - However, if there is no '@' symbol, it will prompt the user 
      //for a valid email.
      
      //check that the email ends in ucla.edu ->Student email.
      const email_end = EmailID.slice(-8)
      if(!(email_end === 'ucla.edu'))
      {
        alert("Please enter a UCLA student email ID");
        window.location.reload(false);
      }
      //Empty password entered by the user
      else if(Password === '')
      {
        alert("Please enter a Password");
        window.location.reload(false);
      }
      //No name field entered by the user
      else if(Name === '')
      {
        alert("Please enter a Name");
        window.location.reload(false);
      }
      else{
            //creates a user via email and password auth. 
            //Treates g.ucla.edu as ucla.edu
            if(EmailID.slice(-8) === "ucla.edu" && !(EmailID.slice(-10) === "g.ucla.edu"))
            {
                const email = EmailID.substring(0,EmailID.length - 8) + "g.ucla.edu"
                try{
                    //adds a user with the email and password required. 
                    await createUserWithEmailAndPassword(auth, email, Password);
                    //prepares the firestore database to push user information onto
                    const db = getFirestore();
                    //gets the users section of the database
                    const accountCollection = collection(db, 'users');
                    //creates a new field for the user account, with email, name, and password
                    const newAccount = {
                        email: email,
                        name: Name,
                        password: Password
                    };
                    //adds the field to the user section of the database. 
                    //navigates to the home page after
                    await setDoc(doc(accountCollection, email), newAccount)
                    navigate('/');
                    }
                catch (error) 
                {
                    alert(error)
                }
            }
            else
            {
                try
                {
                    //adds a user with the email and password required. 
                    await createUserWithEmailAndPassword(auth, EmailID, Password);
                    //prepares the firestore database to push user information onto
                    const db = getFirestore();
                    //gets the users section of the database
                    const accountCollection = collection(db, 'users');
                    //creates a new field for the user account, with email, name, and password
                    const newAccount = {
                        email: EmailID,
                        name: Name,
                        password: Password
                    };
                    //adds the field to the user section of the database.
                    //navigates to the home page after
                    await setDoc(doc(accountCollection, EmailID), newAccount)
                    navigate('/');
                }
                catch (error) 
                {
                    alert(error)
                    window.location.reload(false);
                }
            }
        }
    }
    return(
    <React.Fragment>
    {/*For a form element, hitting enter on either input field will result in form submission. Classname defined for future css styling.*/}
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
    <input type = "email" placeholder = "Email id" onChange = {(event)=>{setEmailID(event.target.value)}} value = {EmailID}/>
    <br />
    <input type = "text" placeholder = "Name" onChange = {(event)=>{setName(event.target.value)}} value = {Name}/>
    <br />
    <input placeholder = "Password" onChange = {(event)=>{setPassword(event.target.value)}} value = {Password}/>
    <br />
    <button>Create an Account</button>
    </form>
    <button onClick={signInWithGoogle}>Sign in with Google</button>
    </React.Fragment>);
    }
  