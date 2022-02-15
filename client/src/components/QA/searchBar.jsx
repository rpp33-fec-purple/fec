import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='qaSearchBar'>
        <form>
          <label htmlFor='question' id='qaSearchBar'></label>
          <input type='text' name='question' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
}

export default SearchBar;
