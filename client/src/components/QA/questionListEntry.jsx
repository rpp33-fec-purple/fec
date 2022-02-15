import React from 'react';
import $ from 'jquery';

class QuestionListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
    }
    this.seeMoreAnswers = this.seeMoreAnswers.bind(this);

  }

  seeMoreAnswers() {
    // make api call here to get all the answers?
  }

  render(){
    var answers = [];
    var QandA = this.props.qACombo;
    for (var key in QandA.answers) {
      answers.push(QandA.answers[key])
    }
    var answersDiv = answers.map(a =>
      <div key={a.id}>
        A: {a.body}
        <br></br> by {a.answerer_name}, {a.date} | Helpful? Yes ({a.helpfulness}) | Report
      </div>
    )

    return (

      <div key={QandA.question_id}>
        Q: {QandA.question_body}
        <br></br> Helpful? Yes ({QandA.question_helpfulness}) | Add Answer
        <div>
          {answersDiv}
          <button onClick={this.seeMoreAnswers.bind(this)}>SEE MORE ANSWERS</button>
        </div>
      </div>

    )
  }

}

export default QuestionListEntry;