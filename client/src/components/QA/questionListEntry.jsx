import React from 'react';
import $ from 'jquery';

class QuestionListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      answersInDisplay: 2,
      displayingAll: false
    }
    this.seeMoreAnswers = this.seeMoreAnswers.bind(this);

  }

  seeMoreAnswers() {
    // console.log('in q list entry', this.props.qACombo)
    var totalNumOfAs = Object.keys(this.props.qACombo.answers).length;
    console.log('total number of questions', totalNumOfAs)
    if (totalNumOfAs > this.state.answersInDisplay) {
      this.setState({
        answersInDisplay: totalNumOfAs,
        displayingAll: true
      })
    }
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
    const answersInView = answersDiv.slice(0, this.state.answersInDisplay);
    if (answersDiv.length > 2) {
      var moreAnswersButton = this.state.displayingAll ? <div/> : <button onClick={this.seeMoreAnswers.bind(this)}>SEE MORE ANSWERS</button>
    } else {
      var moreAnswersButton = <div/>
    }

    return (

      <div key={QandA.question_id}>
        Q: {QandA.question_body}
        <br></br> Helpful? Yes ({QandA.question_helpfulness}) | Add Answer
        <div>
          {answersInView}
          {moreAnswersButton}
        </div>
      </div>

    )
  }

}

export default QuestionListEntry;