import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 70%;
  // box-sizing: border-box;
  // margin: 0;
  // padding: 5px;
  padding: 10px 32px;

  // font-family: 'Arial', sans-serif;
`;

const StyledSearchBar = styled.div`
  body{
    background: #f2f2f2;
    font-family: 'Arial', sans-serif;
  }

  .search {
    width: 100%;
    position: relative;
    display: flex;
  }

  .searchTerm {
    width: 100%;
    border: 3px solid #724060;
    padding: 5px;
    height: 35px;
    // width: 100px;
    outline: none;
    color: #724060;
    font-size: 16px;

    // border-right: none;
    // border-radius: 5px 0 0 5px;
  }

  .searchTerm:focus{
    color: #724060;
  }

  .searchButton {
    width: 50px;
    height: 25px;
    border: 1px solid #724060;
    background: #724060;
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 13px;
    padding-left: 2px;
    padding-right: 2px;
  }

  /*Resize the wrap to see the search bar change!*/
  .wrap{
    // width: 30%;
    // position: relative;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
  }


`;

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
    $.ajax({
      url: `${baseUrl}/qa/questions`,
      data: {
        product_id: this.props.productID,
        page: 1,
        count: 100
      },
      method: 'GET',
      success: (data) => {
        // console.log('data in client', data);
        var filteredList = data.results.filter((val) => {
          if (term === '') {
            return val;
          } else if (val.question_body.toLowerCase().includes(term.toLowerCase())) {
            return val;
          }
        })
        // console.log('filtered list', filteredList)
        if (term === '') {
          this.props.updateStateCauseFilter(filteredList, false, term)
        } else {
          this.props.updateStateCauseFilter(filteredList, true, term)
        }
      },
      error: (err) => {
        console.log('Error with GET request in filter:', err);
      }
    });

    // var term = this.state.searchTerm;
    // var filteredList = this.props.qAndAList.filter((val) => {
    //   if (term === '') {
    //     return val;
    //   } else if (val.question_body.toLowerCase().includes(term.toLowerCase())) {
    //     return val;
    //   }
    // })
    // console.log('filtered list', filteredList)
    // if (term === '') {
    //   this.props.updateStateCauseFilter(filteredList, false, term)
    // } else {
    //   this.props.updateStateCauseFilter(filteredList, true, term)
    // }
  }

  render() {
    return (
      <Container>
        <StyledSearchBar>
          <div id='qaSearchBar'>
            <form className='search'>
              <label htmlFor='question' id='qaSearchBar'></label>
              <input type='text' name='question' className='searchTerm' size="97" placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...' onChange={this.handleChange}></input>
              {/* <button type="submit" className='searchButton'>Search</button> */}
            </form>
          </div>
        </StyledSearchBar>
      </Container>
    )
  }
}

export default SearchBar;
