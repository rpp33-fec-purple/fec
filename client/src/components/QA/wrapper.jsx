import React from 'react';
import SearchBar from './searchBar.jsx';
import ListView from './listView.jsx';
import AddQuestion from './addQuestion.jsx';
import sampleProductQuestions from './sampleData.js';

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
    var filterApplies = false;
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

  rerenderQandAs() {
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

  sortQuestions(data) {
    var sorted = data.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
    return sorted;
  }

  updateStateCauseFilter(filteredList, bool) {
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
    // console.log('product name line 64', this.props)

    var productName = this.props.product.name;
    if (this.filterApplies) {
      var listDiv = this.state.filteredAndSorted ? <ListView rerenderQandAs={this.rerenderQandAs} qAndAList={this.state.filteredAndSorted} productName={productName} productID={this.props.product.id}/> : <div/>
    } else {
      // console.log('product name in QA', this.props.product.name)
      var listDiv = this.state.sortedQuestions ? <ListView rerenderQandAs={this.rerenderQandAs} qAndAList={this.state.sortedQuestions} productName={productName}/> : <div/>
    }

    return (
      <div>
        <h2>Questions and Answers</h2>
        <SearchBar qAndAList={this.state.sortedQuestions} updateStateCauseFilter={this.updateStateCauseFilter}/>
        <div>{listDiv}</div>
        <AddQuestion questionAdded={this.rerenderQandAs} productName={this.props.product.name} productID={this.props.product.id}/>
      </div>
    )
  }
}

export default QAndA;
