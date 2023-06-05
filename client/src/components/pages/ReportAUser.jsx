import React, { useState } from "react";
import {getFirestore, collection, doc, getDoc, setDoc} from "firebase/firestore"
import { useNavigate } from 'react-router-dom';

const ReportUser = () =>
{
    const [EmailID, setEmailID] = useState('')
    const [Reason, setReason] = useState('')
    const navigate = useNavigate();

    const submit = async(event) => {
        event.preventDefault()
        const db = getFirestore();

        const User_Reference = doc(db, 'users', EmailID)
        console.log(User_Reference)
        const userSnapshot = await getDoc(User_Reference);
        if(userSnapshot.exists())
        {
            const account_collection = collection(db, "reported-users")
            const newAccount = {
                email: EmailID,
                reason: Reason
            }
            await setDoc(doc(account_collection, EmailID), newAccount)
                    navigate('/');
        }
        else{
            alert("No such user exists!")
            window.location.reload(false);
        }

    }

    return(
    <form onSubmit = {submit}>
    <h4>Enter the email ID of the individual you wish to report and why you would like to report them</h4>
    <input type = "email" placeholder = "Email id" onChange = {(event)=>{setEmailID(event.target.value)}} value = {EmailID} />
    <br />
    <input type = "text" placeholder = "Reason" onChange = {(event)=>{setReason(event.target.value)}} value = {Reason} />
    
    <button>Submit</button>
    </form>
    );
}

export default ReportUser;