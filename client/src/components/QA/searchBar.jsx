import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      searchTerm: ''

    }

    this.handleChange = this.handleChange.bind(this);
    this.sortWithFilter = this.sortWithFilter.bind(this);

  }

  handleChange(e) {
    e.preventDefault();
    var term = e.target.value;
    if (term.length >= 3) {
      this.setState({
        searchTerm: e.target.value
      }, () => {
        this.sortWithFilter(this.state.searchTerm)
      })
    } else {
      this.setState({
        searchTerm: ''
      }, () => {
        this.sortWithFilter(this.state.searchTerm)
      })
    }
  }

  sortWithFilter() {
    var term = this.state.searchTerm;
    var filteredList = this.props.qAndAList.filter((val) => {
      if (term === '') {
        return val;
      } else if (val.question_body.toLowerCase().includes(term.toLowerCase())) {
        return val;
      }
    })
    console.log('filtered list', filteredList)
    if (term === '') {
      this.props.updateStateCauseFilter(filteredList, false)
    } else {
      this.props.updateStateCauseFilter(filteredList, true)
    }
  }

  render() {
    return (
      <div id='qaSearchBar'>
        <form>
          <label htmlFor='question' id='qaSearchBar'></label>
          <input type='text' name='question' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...' onChange={this.handleChange}></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
}

export default SearchBar;
