import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Datepicker from "react-tailwindcss-datepicker"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth, db } from '../Firebase'
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import './SearchBar.css'
import CardItem from './CardItem';

/*
Overall Searching Functionality:
- Search:
  - Apartment Name 
  - Start Date / End Date
  - Price Range 
- Filter: 
  - single/double/triple 
  - Checkbox: air_con 
*/

//function to calculate similarity between two strings
function jaroWinklerDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const maxDistance = Math.floor(Math.max(m, n) / 2) - 1;

  //array to store matches
  const matches1 = new Array(m).fill(false);
  const matches2 = new Array(n).fill(false);

  let matches = 0; //count of matching characters
  let transpositions = 0; //count of transpositions

  //calculate matches
  for (let i = 0; i < m; i++) {
    const start = Math.max(0, i - maxDistance);
    const end = Math.min(i + maxDistance + 1, n);
    for (let j = start; j < end; j++) {
      if (!matches2[j] && str1[i] === str2[j]) {
        matches1[i] = true;
        matches2[j] = true;
        matches++;
        break;
      }
    }
  }

  //no matches found
  if (matches === 0) {
    return 0;
  }

  // Calculate transpositions
  let k = 0;
  for (let i = 0; i < m; i++) {
    if (matches1[i]) {
      while (!matches2[k]) {
        k++;
      }
      if (str1[i] !== str2[k]) {
        transpositions++;
      }
      k++;
    }
  }

  //calculate similarity
  const similarity = (matches / m + matches / n + (matches - transpositions / 2) / matches) / 3;

  //calculate common prefix length (up to 4 characters)
  const prefix = str1.substring(0, 4) === str2.substring(0, 4) ? 1 : 0;

  //calculate Jaro-Winkler distance
  const jaroWinklerDistance = similarity + prefix * 0.1 * (1 - similarity);

  return jaroWinklerDistance;
}

function SearchBar() {

  const [ userData, setUserData ] = useState()
  const [ searchQ, setSearchQ ] = useState("")
  const [ dateFlag, setDateFlag ] = useState(false);
  const [ startDate, setStartDate] = useState(new Date());
  const [ endDate, setEndDate] = useState(new Date());

  const [ AC, setAC ] = useState(false);

  const [ allProperties, setAllProperties ] = useState([])
  const [ filteredProperties, setFilteredProperties ] = useState([])

  const getAllProperty = async () => {
    const propertyData = await getDocs(collection(db, "Properties"))
    const propFilteredData = propertyData.docs.map((doc) => ({...doc.data(), id: doc.id}))
    setAllProperties(propFilteredData)
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    let propertiesRef = collection(db, "Properties")
    const propertyData = await getDocs(propertiesRef)

    const propSnap = await getDocs(collection(db, "Properties"));

    let propDocs = propSnap.docs.map((doc) => {
      return {...doc.data(), id: doc.id}
    })

    let filteredDocs = propDocs; 

    if (dateFlag) {
      filteredDocs = filteredDocs.filter((doc) => {
        //console.log(doc)        
        if (!(doc.StartDate)) return false
        if (!(doc.EndDate)) return false
        const pEndDate = doc.StartDate.toDate().getTime() / 1000
        const pStartDate = doc.EndDate.toDate().getTime() / 1000

        const qEndDate = new Date(endDate).getTime() / 1000
        const qStartDate = new Date(startDate).getTime() / 1000

        return pEndDate < qEndDate && pStartDate > qStartDate;
      });
    }

    if (searchQ != "") {
      filteredDocs = filteredDocs.filter((doc) => {
        console.log(searchQ.toLocaleLowerCase())
        console.log(doc.AptName)
        console.log(doc)
        
        let string1 = doc.AptName.toLocaleLowerCase()
        let string2 = searchQ.toLocaleLowerCase()
        return jaroWinklerDistance(string1, string2) > 0.85
      });
    }

    if (AC) {
      filteredDocs = filteredDocs.filter((listing) => {
        return listing.AirConditioner == true;
      })
    } 
  
      //can add more filters here if necessary
  
    setFilteredProperties(filteredDocs)


    
    //code for filtering on firebase db: 
    // const q = query(propertiesRef, where("AptName", "==", searchQ));
    // const querySnapshot = await getDocs(q);
    // const propFilteredData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    // setFilteredProperties(propFilteredData)

    //more code for filtering from firebase db:
    // collection(db, 'Properties').where('AptName', '==', searchQ).get()
    // .then((querySnapshot) => {
    //   setProperties(querySnapshot.forEach((doc) => {
    //     // Process the documents that match the condition
    //     console.log ({...doc.data(), id: doc.id})
    //   }));
    // })
    // .catch((error) => {
    //   console.log('Error getting documents: ', error);
    // });

    //note: data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    //syntax -- .docs is where all the docs are, use the map() to pull data into cleaner format
    //where(Start_Date, "==", "")
  }

  //on initial load!! 
  useEffect(()=> {
    getAllProperty()
    setFilteredProperties(allProperties)
  }, [])

  return (
    <>
      <form>
        <div className='login-container'>
            <img class='img-background' src={process.env.PUBLIC_URL + './images/bcgrd.png'} alt='search' />
            <div className='title'>Find YOUR Apartment WORK</div>
        </div>
        <br></br><br></br>

        <p>Dates</p>

        <label>Start Date:</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <label>End Date:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />

        <p>Price</p>
        <input></input>
        <input></input>

        <p>Apartment Name</p>
        <input 
          type="search" 
          name="search-form" 
          value={searchQ} 
          onChange={(e)=>setSearchQ(e.target.value)}>
        </input>

        <p>Apartment Type</p>
        <select>
          <option value="any">any</option>
          <option value="single">single</option>
          <option value="double">double</option>
          <option value="triple">triple</option>
        </select>


        <p>Amenities</p>
        <input onChange={(e) => { setAC(e.target.checked)} } type="checkbox"></input>
        <label>Need AC</label>

        <br></br><br></br>

        <button onClick={handleSubmit}>Search</button>

        <br></br>

        <br></br><br></br>

        {filteredProperties?.map((listing) => {
            return <CardItem
                text={listing.AptName + ": " +  listing.StartDate?.toDate().toDateString() + " - " + listing.EndDate?.toDate().toDateString()}
            ></CardItem>
        })}

      </form>
    </>
  );
}

export default SearchBar;
