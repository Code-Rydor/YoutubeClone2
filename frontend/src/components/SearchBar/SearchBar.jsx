import React, { useState } from 'react';
import { getOverlayDirection } from 'react-bootstrap/esm/helpers';


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


// import { Button, Form, FormControl } from "react-bootstrap";

// const SearchBar = (props) => {
//   function handleSubmit(event) {
//     event.preventDefault();
//     console.log(props.search);
//     props.getVideo();
//     props.setSearch("");
//   }

//   return (
//     <Form className="d-flex center" onSubmit={handleSubmit}>
//       <FormControl
//         className="me-2"
//         type="search"
//         value={props.search}
//         onChange={(event) => props.setSearch(event.target.value)}
//       />
//       <input type="text"> placeholder="Search...">
//       <Button type="submit">Search</Button>
//     </Form>
//   );
// }    

// export default SearchBar;
