import React from 'react';
import SearchBar from './searchBar.jsx';
import ListView from './listView.jsx';
import AddQuestion from './addQuestion.jsx';
import sampleProductQuestions from './sampleData.js';
import $ from 'jquery';

class QAndA extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      sortedQuestions: [],
      questionsInView: []
    }
    this.sortQuestions = this.sortQuestions.bind(this);
  }

  componentDidMount() {
    // the props should have the product ID
    // once I have the product ID, I should make a call to the API to get the questions and answers
    // var productID = this.props.productID;
    console.log('product id in wrapper', this.props)

    $.ajax({
      url: `http://localhost:3000/qa/questions`,
      data: {
        product_id: this.props.productID,
        page: 1,
        count: 50
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




    // this.sortQuestions(sampleProductQuestions, (sorted) => {
    //   this.setState({
    //     sortedQuestions: sorted
    //   }, () => {
    //     console.log('sortedQuestions in state', this.state.sortedQuestions)
    //   })
    // });
  }

  sortQuestions(data, cb) {
    var sorted = data.results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
    cb(sorted);
  }

  render() {

    let listDiv = this.state.sortedQuestions ? <ListView qa={this.state.sortedQuestions} /> : <div/>

    return (
      <div>
        <h2>Questions and Answers</h2>
        <SearchBar/>
        <div>{listDiv}</div>
        <AddQuestion/>
      </div>
    )
  }
}

export default QAndA;