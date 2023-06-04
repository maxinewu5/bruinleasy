import React, {useState} from 'react';

function SearchBar() {
    const searchBar = () => {}
    const [search, setSearch] = useState('');

    const handleChange = (x) => {
        x.preventDefault();
        setSearch(x.target.value);
    };

  return (
    <div>
        <input
            type='search'
            placeholder='search here'
            onChange={handleChange}
            value={search}></input>
    </div>
  );
}

export default SearchBar;
