import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Datepicker from "react-tailwindcss-datepicker"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth, db } from '../Firebase'
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import './SearchBar.css'
import CardItem from './CardItem';
import { jaroWinklerDistance } from './scripts/search'

// Overall Searching Functionality:
// - Search:
//   - apartment name
//   - start date / end date
//   - price range
// - Filter: 
//   - single/double/triple 
//   - Checkbox: air conditioning

function SearchBar( { setFilteredProperties }) {

  const [ userData, setUserData ] = useState()
  const [ searchQ, setSearchQ ] = useState("")
  const [ priceQ, setPriceQ ] = useState("")
  const [ dateFlag, setDateFlag ] = useState(false);
  const [ startDate, setStartDate] = useState(undefined);
  const [ endDate, setEndDate] = useState(undefined);
  const [ AC, setAC ] = useState(false);
  const [ filtersActive, setFiltersActive ] = useState(false)

  const getAllProperty = async () => {
    const propertyData = await getDocs(collection(db, "Properties"))
    const propFilteredData = propertyData.docs.map((doc) => ({...doc.data(), id: doc.id}))
    setFilteredProperties(propFilteredData)
  }

  //function to handle when the search form is submitted
  const handleSubmit = async (e) => {
    //prevents the page from refreshing like default
    e.preventDefault()

    let propertiesRef = collection(db, "Properties")
    const propertyData = await getDocs(propertiesRef)
    //get all documnts from the properties collection
    const propSnap = await getDocs(collection(db, "Properties"));

    //clean up propSnap to extract the actual useful data
    let propDocs = propSnap.docs.map((doc) => {
      return {...doc.data(), id: doc.id}
    })

    let filteredDocs = propDocs; 

    //filter for date (only apply if date has been explicitly set by user, not default)
    if (dateFlag) {
      filteredDocs = filteredDocs.filter((doc) => {     
        if (!(doc.StartDate)) return false
        if (!(doc.EndDate)) return false

        //calculates end dates and start dates in ms
        const pEndDate = doc.StartDate.toDate().getTime() / 1000
        const pStartDate = doc.EndDate.toDate().getTime() / 1000
        const qEndDate = new Date(endDate).getTime() / 1000
        const qStartDate = new Date(startDate).getTime() / 1000

        //returns true if the doc matches the criteria
        return pEndDate < qEndDate && pStartDate > qStartDate;
      });
    }

    //filter for search 
    if (searchQ != "") {
      filteredDocs = filteredDocs.filter((doc) => {
        //make case insensitive
        let string1 = doc.AptName.toLocaleLowerCase()
        let string2 = searchQ.toLocaleLowerCase()
        //do a fuzzy search based on jaroWinkler distance
        return jaroWinklerDistance(string1, string2) > 0.85
      });
    }

    //filter for price
    if (priceQ != "") {
      filteredDocs = filteredDocs.filter((doc) => {
        let propertyPrice = parseInt(doc.Rent); 
        let renterPrice = parseInt(priceQ);
        //match between 90% to 110% of the price range
        return (renterPrice * 0.9 < propertyPrice) && (propertyPrice < renterPrice * 1.1);
      });
    }

    //filter for ac
    if (AC) {
      filteredDocs = filteredDocs.filter((listing) => {
        return listing.AirConditioner == true;
      })
    } 
  
    //can add more filters here if necessary
  
    //update the filtered properties from the passed down function
    setFilteredProperties(filteredDocs)
  }

  //on initial load, get properties 
  useEffect(()=> {
    getAllProperty()
  }, [])

  return (
    <>
      <form>
      
      <div className='form-div'>
        
        <div className="search-bar">
          <div>
            <label>Start Date:</label>
            <DatePicker 
              selected={startDate}
              onChange={(date) => {setStartDate(date); setDateFlag(true)}} 
              dateFormat="MM/dd/yyyy"
            />
          </div>
          
          <div>
            <label>End Date:</label>
            <DatePicker 
              selected={endDate}
              onChange={(date) => {setEndDate(date); setDateFlag(true)}}
              dateFormat="MM/dd/yyyy"
            />
          </div>

          <div>
            <label>Price</label>
            <br></br>
            <input 
              type="price"
              name="price"
              value={priceQ}
              onChange={(e)=>setPriceQ(e.target.value)}
            ></input> 
          </div>

          <div>
            <br></br>
            <button onClick={handleSubmit}>Search</button>
          </div>
        </div>

        <br></br><br></br>
        <button type="button" class="collapsible" onClick={()=>{setFiltersActive(!filtersActive)}}>
        { filtersActive ? "Close" : "Expand"} Filters
        </button>
        <div class="filters" style={{ display: filtersActive ? "block" : "none" }}>
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
          <label>Air Conditioning</label>
        </div>
        </div>
      </form>
    </>
  );
}

export default SearchBar;
