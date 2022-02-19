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
    this.sortAnswers = this.sortAnswers.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  seeMoreAnswers() {
    console.log('qa combo', this.props.qACombo.answers)
    var totalNumOfAs = Object.keys(this.props.qACombo.answers).length;
    console.log('total number of questions', totalNumOfAs)
    if (totalNumOfAs > this.state.answersInDisplay) {
      this.setState({
        answersInDisplay: totalNumOfAs,
        displayingAll: true
      })
    }
  }

  sortAnswers(answers) {
    var sorted = answers.sort((a, b) => b.helpfulness - a.helpfulness);
    var sellerFirst = []
    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i].answerer_name === 'Seller') {
        sellerFirst.push(sorted[i]);
        sorted.splice(i, 1);
      }
    }
    sellerFirst = sellerFirst.concat(sorted);
    return sellerFirst;
  }

  formatDate(isoDate) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];

    return `${monthName} ${day}, ${year}`
  }


  render(){
    var answers = [];
    var QandA = this.props.qACombo;
    for (var key in QandA.answers) {
      answers.push(QandA.answers[key])
    }

    var sorted = this.sortAnswers(answers);


    var answersDiv = sorted.map(a =>
      <div key={a.id}>
        A: {a.body}
        <br></br> by {a.answerer_name}, {this.formatDate(a.date)} | Helpful? Yes ({a.helpfulness}) | Report
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
        Q: {QandA.question_body}   Helpful? Yes ({QandA.question_helpfulness}) | Add Answer
        <div>
          {answersInView}
          {moreAnswersButton}
        </div>
      </div>

    )
  }

}

export default QuestionListEntry;