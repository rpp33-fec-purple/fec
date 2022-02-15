import React from 'react';
import $ from 'jquery';


class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      inDisplay: 2,
      noMoreToDisplay: false
    }
    this.seeMoreQuestions = this.seeMoreQuestions.bind(this);
  }

  seeMoreQuestions() {
    var totalNumOfQs = this.props.qa.length;
    var termObject = {'inDisplay': 2}
    // the below get request is just temporary. I plan on retrieving all questions
    // with one get request to the API whenever a product is chosen
    // I will use a sort of reursive solution to make sure I am obtaining all questions
    // related to a product from the API
    $.get('/questions', termObject, (data)=> {
      console.log(data);
    })


  }

  render (){
    const questionsList = this.props.qa.map(qa => {
      var answers = [];
      for (var key in qa.answers) {
        answers.push(qa.answers[key])
      }
      var answersDiv = answers.map(a =>
        <div key={a.id}>
          A: {a.body}
          <br></br> by {a.answerer_name}, {a.date} | Helpful? Yes ({a.helpfulness}) | Report
        </div>
      )
      return (
        <li key={qa.question_id}>
        Q: {qa.question_body}
        <br></br> Helpful? Yes ({qa.question_helpfulness}) | Add Answer
        <div>{answersDiv}</div>
      </li>
      )
    })

    return (
      <div id='qaView'>
        <ul>{questionsList}</ul>
        <button onClick={this.seeMoreQuestions}>MORE ANSWERED QUESTIONS</button>
      </div>
    )
  }
}

export default ListView;