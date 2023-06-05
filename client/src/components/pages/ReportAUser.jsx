import React, { useState } from "react";
import {getFirestore, collection, doc, getDoc, updateDoc, arrayUnion} from "firebase/firestore"
import { useNavigate } from 'react-router-dom';
import '../Login.css';

const ReportUser =() =>
{
    const [EmailID, setEmailID] = useState('')
    const [Reason, setReason] = useState('')
    const navigate = useNavigate();

    const submit = async(event) => {
        event.preventDefault()
        const db = getFirestore();
        if(EmailID.slice(-8) === "ucla.edu" && !(EmailID.slice(-10) === "g.ucla.edu"))
            {
                const email = EmailID.substring(0,EmailID.length - 8) + "g.ucla.edu"
                console.log(email)
                const User_Reference = doc(db, 'users', email)
                console.log(User_Reference)
                const userSnapshot = await getDoc(User_Reference);
                if(userSnapshot.exists())
                {
                    const account_collection = collection(db, "reported-users")
                    const newAccount = {
                        email: email,
                        reason: arrayUnion(Reason)
                    }

                await updateDoc(doc(account_collection, email), newAccount)
                navigate('/');
                }
                else{
                        alert("No such user exists!")
                        window.location.reload(false);
                    }

            }
        else
        {
            const User_Reference = doc(db, 'users', EmailID)
                console.log(User_Reference)
                const userSnapshot = await getDoc(User_Reference);
                if(userSnapshot.exists())
                {
                    const account_collection = collection(db, "reported-users")
                    const newAccount = {
                        email: EmailID,
                        reason: arrayUnion(Reason)
                    }

                await updateDoc(doc(account_collection, EmailID), newAccount)
                navigate('/');
                }
                else{
                        alert("No such user exists!")
                        window.location.reload(false);
                    }
        }
    }

    return (
        <React.Fragment>
            <div className='login_page'>
                <div className='login_container'>
                    <img className='login_house_logo' src={process.env.PUBLIC_URL + './images/login-key.png'} alt = "Login-House" />
                    {/*For a form element, hitting enter on either input field will result in form submission. Classname defined for future css styling.*/}
                    {/* <img src= {process.env.PUBLIC_URL + './images/logo.png'} alt = "BruinLeasy logo"/> */}
                    <div className='login_submission'>
                        <form classname = "login_form" onSubmit={submit}>
                            <img class='login_logo_pic' src={process.env.PUBLIC_URL + './images/logo.png'} alt = "Logo" />
                            <h4 className='report_text'>Enter the email ID of the individual you wish to report and why you would like to report them</h4>
                            <input className='login_box' placeholder="Email" onChange={(event) => { setEmailID(event.target.value) }} value={EmailID} />
                            <br />
                            <input className='login_box' placeholder="Reason" onChange={(event) => { setReason(event.target.value) }} value={Reason} />
                            <div className='submit'>
                                <button className='btn--outline--medium'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

    }   

export default ReportUser;