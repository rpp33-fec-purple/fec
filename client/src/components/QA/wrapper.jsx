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
      questionsInView: []
    }
    this.sortQuestions = this.sortQuestions.bind(this);
  }

  componentDidMount() {
    console.log('product id in wrapper', this.props)

    $.ajax({
      url: `http://localhost:3000/qa/questions`,
      data: {
        product_id: this.props.product.id,
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

  }

  sortQuestions(data, cb) {
    var sorted = data.results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
    cb(sorted);
  }

  render() {

    let listDiv = this.state.sortedQuestions ? <ListView qAndAList={this.state.sortedQuestions} productName={this.props.product.name}/> : <div/>

    return (
      <div>
        <h2>Questions and Answers</h2>
        <SearchBar/>
        <div>{listDiv}</div>
        <AddQuestion productName={this.props.product.name}/>
      </div>
    )
  }
}

export default QAndA;
