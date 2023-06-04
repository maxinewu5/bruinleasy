import React, { useState } from 'react';
import SearchBar from './SearchBar';
import CardItem from './CardItem';

function ExplorePage() {

    const [ properties, setProperties ] = useState()

    return (
    <>
        <h1>Explore!</h1>    

        <SearchBar />

        {properties?.map((listing) => {
            return <CardItem
                text={listing.AptName}
            ></CardItem>
        })}

    </>
  );
}

export default ExplorePage;
