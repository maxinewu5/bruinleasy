import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Datepicker from "react-tailwindcss-datepicker"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth, db } from '../Firebase'
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import './SearchBar.css'
import './Login.css'
import CardItem from './CardItem';
import { jaroWinklerDistance } from './scripts/search'
import { AiOutlineSearch, AiFillFilter } from "react-icons/ai";

// Overall Searching Functionality:
// - Search:
//   - apartment name
//   - start date / end date
//   - price range
// - Filter: 
//   - single/double/triple 
//   - Checkbox: air conditioning

function FilterModal ( {closeModal} ) {
  return (
    <>
      <button onClick={()=>{closeModal(false)}}>X</button>
      <h1>Hi!</h1>
      <h2>Bye!</h2>
      <h3>Test</h3>
    </>
  )
}

function SearchBar( { setFilteredProperties }) {

  const [ userData, setUserData ] = useState()
  const [ searchQ, setSearchQ ] = useState("")
  const [ priceQ, setPriceQ ] = useState("")
  const [ dateFlag, setDateFlag ] = useState(false);
  const [ startDate, setStartDate] = useState(undefined);
  const [ endDate, setEndDate] = useState(undefined);
  const [ AC, setAC ] = useState(false);
  const [ parking, setParking ] = useState(false);
  const [ furnishing, setFurnishing ] = useState(false);
  const [ rooftop, setRooftop ] = useState(false);
  const [ lobby, setLobby ] = useState(false);
  const [ filtersActive, setFiltersActive ] = useState(false)
  const [ openModal, setOpenModal ] = useState(false)

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

    //filter for parking
    if (parking) {
      filteredDocs = filteredDocs.filter((listing) => {
        return listing.Parking == true;
      })
    } 

    //filter for furnishing
    if (furnishing) {
      filteredDocs = filteredDocs.filter((listing) => {
        return listing.Furnishing == true;
      })
    } 

    //filter for rooftop
    if (rooftop) {
      filteredDocs = filteredDocs.filter((listing) => {
        return listing.Rooftop == true;
      })
    } 

    //filter for lobby
    if (lobby) {
      filteredDocs = filteredDocs.filter((listing) => {
        return listing.Lobby == true;
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
      <h1 className='EXPLORE'>EXPL
        <span className='yellow_explore'>O</span>
        <span className='blue_explore'>R</span>
        E</h1>
        <div className="search-bar">
          <div className='search-bar-main'>
          <div>
            <label>PRICE</label>
            <br></br>
            <input 
              className="input-box"
              type="number"
              value={priceQ}
              onChange={(e)=>setPriceQ(e.target.value)}
            /> 
          </div> 
          <div>
            <label>START DATE</label>
            <DatePicker 
              className="input-box"
              selected={startDate}
              onChange={(date) => {setStartDate(date); setDateFlag(true)}} 
              dateFormat="MM/dd/yyyy"
            />
          </div>
          
          <div>
            <label>END DATE</label>
            <DatePicker 
              className="input-box"
              selected={endDate}
              onChange={(date) => {setEndDate(date); setDateFlag(true)}}
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div>
            <label>FILTER</label>
            <br></br>
            <button 
               className="btnfilter btn"  
               type="button"
               onClick={()=>{ setOpenModal(true); setFiltersActive(!filtersActive)}}>
                <AiFillFilter></AiFillFilter>
            </button>
          </div>

          <div>
            <label>SEARCH </label>
            <br></br>
            <button 
               className="btnsearch btn"
                onClick={handleSubmit}>
                <AiOutlineSearch></AiOutlineSearch>
            </button>
          </div>

        </div>
        </div>
        <br></br>
        {/* <div
          className="btn--filter"
          type="button" 
          class="collapsible" 
          onClick={()=>{ setFiltersActive(!filtersActive) }}
        >
        { <p><u>{ filtersActive ? "CLOSE" : "EXPAND"} FILTERS</u></p> }
        </div> */}
      <div class filters_bar>
      {/* <div className={filtersActive ? 'filters_bar' : 'filters_bar active'}> */}
        {/* <div className="filters" style={{ display: filtersActive ? "block" : "none" }}> */}
        <ul className={filtersActive ? 'filters active' : 'filters'} > 
          <li className='filter_item'>
            <p className='text_s'>APARTMENT NAME</p>
            <input 
              className='text_s'
              type="search" 
              name="search-form" 
              value={searchQ} 
              onChange={(e)=>setSearchQ(e.target.value)}>
            </input>
          </li>
          <li className='filter_item'>
            <p className='text_s'>APARTMENT TYPE</p>
            <select className='text_s'>
              <option value="any">any</option>
              <option value="single">single</option>
              <option value="double">double</option>
              <option value="triple">triple</option>
            </select>
          </li>
          <li className='filter_item'>
            <p className='text_s'>AMENITIES</p>
            <input className='check_box_s' onChange={(e) => { setAC(e.target.checked)} } type="checkbox"></input>
            <label className='text_special'>air conditioning</label>
            <input className='check_box_s' onChange={(e) => { setParking(e.target.checked)} } type="checkbox"></input>
            <label className='text_special'>parking</label>
            <input className='check_box_s' onChange={(e) => { setFurnishing(e.target.checked)} } type="checkbox"></input>
            <label className='text_special'>furnishing</label>
            <input className='check_box_s' onChange={(e) => { setRooftop(e.target.checked)} } type="checkbox"></input>
            <label className='text_special'>rooftop</label>
            <input className='check_box_s' onChange={(e) => { setLobby(e.target.checked)} } type="checkbox"></input>
            <label className='text_special'>lobby</label>
            {/*notes right now everything is at setAC, make sure to change for parking furnishing etc too */}
          </li>
        </ul>
        </div>
      </div>
{/*   { openModal && <FilterModal closeModal={()=>{setOpenModal(false)}}/>} */}

      </form>

    </>
  );
}

export default SearchBar;
