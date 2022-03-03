import React from 'react';
import SearchBar from './searchBar.jsx';
import ListView from './listView.jsx';
import AddQuestion from './addQuestion.jsx';
import sampleProductQuestions from './sampleData.js';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  // height: 70%;
  // box-sizing: border-box;
  // margin: 0;
  // padding: 0;
  // font-family: 'Arial', sans-serif;

  // position: inherit;
`


class QAndA extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      sortedQuestions: [],
      questionsInView: [],
      filteredAndSorted: []
    }
    this.sortQuestions = this.sortQuestions.bind(this);
    this.updateStateCauseFilter = this.updateStateCauseFilter.bind(this);
    this.rerenderQandAs = this.rerenderQandAs.bind(this);
    this.filterAndSortHere = this.filterAndSortHere.bind(this);
    var filterApplies = false;
    var unofficialSearchTerm = '';
  }

  componentDidMount() {
    console.log('product id in wrapper', this.props)

    $.ajax({
      url: `http://localhost:3000/qa/questions`,
      data: {
        product_id: this.props.product.id,
        page: 1,
        count: 100
      },
      method: 'GET',
      success: (data) => {
        console.log('data in client', data);
        this.setState({sortedQuestions: data.results});
      },
      error: (err) => {
        console.log('Error with GET request:', err);
      }
    });
  }

  rerenderQandAs(qandAs) {
    if (qandAs) {
      this.setState({sortedQuestions: qandAs});
    } else {
      $.ajax({
        url: `http://localhost:3000/qa/questions`,
        data: {
          product_id: this.props.product.id,
          page: 1,
          count: 100
        },
        method: 'GET',
        success: (data) => {
          console.log('data in client', data);
          if (this.filterApplies) {
            this.filterAndSortHere(data.results)
          } else {
            this.setState({sortedQuestions: data.results});
          }
        },
        error: (err) => {
          console.log('Error with GET request:', err);
        }
      });
    }
  }

  filterAndSortHere(qas) {
    var term = this.unofficialSearchTerm;
    var filteredList = qas.filter((val) => {
      if (term === '') {
        return val;
      } else if (val.question_body.toLowerCase().includes(term.toLowerCase())) {
        return val;
      }
    })
    console.log('filtered list', filteredList)
    if (term === '') {
      this.updateStateCauseFilter(filteredList, false, term)
    } else {
      this.updateStateCauseFilter(filteredList, true, term)
    }
  }


  sortQuestions(data) {
    var sorted = data.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
    return sorted;
  }

  updateStateCauseFilter(filteredList, bool, searchTerm) {
    this.unofficialSearchTerm = searchTerm;
    if (bool) {
      var sortedAndFiltered = this.sortQuestions(filteredList);
      this.filterApplies = true;
      this.setState({
        filteredAndSorted: sortedAndFiltered
      })
    } else {
      this.filterApplies = false;
      this.setState({
        filteredAndSorted: ''
      })
    }
  }

  render() {

    var productName = this.props.product.name;
    if (this.filterApplies) {
      var listDiv = this.state.filteredAndSorted ? <ListView rerenderQandAs={this.rerenderQandAs} qAndAList={this.state.filteredAndSorted} productName={productName} productID={this.props.product.id}/> : <div/>
    } else {
      var listDiv = this.state.sortedQuestions ? <ListView rerenderQandAs={this.rerenderQandAs} qAndAList={this.state.sortedQuestions} productName={productName} productID={this.props.product.id}/> : <div/>
    }

    return (
        <div>
          <h2>Questions and Answers</h2>
          <SearchBar qAndAList={this.state.sortedQuestions} updateStateCauseFilter={this.updateStateCauseFilter} productID={this.props.product.id}/>
          <div>{listDiv}</div>
          <AddQuestion questionAdded={this.rerenderQandAs} productName={this.props.product.name} productID={this.props.product.id}/>
        </div>
    )
  }
}

export default QAndA;
