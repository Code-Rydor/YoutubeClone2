import React, { useState } from 'react';



const SearchBar = ({ getVideo }) => {

  const [searchTerm, setSearchTerm] = useState("");


  function handleSubmit(event) {
    event.preventDefault();
    getVideo(searchTerm)
  }

  return ( 
    <div>
      <form onSubmit={handleSubmit}>        
        <input type='text' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <button type='submit'>Search</button>
      </form>
    </div>
   );
}
 
export default SearchBar;
