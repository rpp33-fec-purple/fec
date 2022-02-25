import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import AnswerModal from './Modals/addAnswerModal.jsx';

const Container = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  // height: 10vh;
  // box-sizing: border-box;
  // margin: 0;
  // padding: 0;
  // font-family: 'Arial', sans-serif;
`

const ScrollableList = styled.div`
      margin: 0 auto;
      max-height: 150px;
      width: 100%;
      overflow: auto;
      border: 1px solid black;
      // display: flex;
      // justify-content: center;
      align-items: center;
  `;

class QuestionListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      answersInDisplay: 2,
      displayingAll: false,
      isModalShowing: false
    }
    this.seeMoreAnswers = this.seeMoreAnswers.bind(this);
    this.collapseAnswers = this.collapseAnswers.bind(this);
    this.sortAnswers = this.sortAnswers.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.changeModalVisibilityState = this.changeModalVisibilityState.bind(this);
    this.markQuestionHelpful = this.markQuestionHelpful.bind(this);
    this.reportQuestion = this.reportQuestion.bind(this);
    this.markAnswerHelpful = this.markAnswerHelpful.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  changeModalVisibilityState() {
    this.setState({
      isModalShowing: !this.state.isModalShowing
    }, ()=> {
      console.log('is modal showing in changestate func', this.state.isModalShowing)
    })
  }

  collapseAnswers() {
    this.setState({
      answersInDisplay: 2,
      displayingAll: false
    })
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

  markQuestionHelpful(questionID) {
    $.ajax({
      url: `http://localhost:3000/qa/questions/${questionID}/helpful`,
      data: {
        question_id: questionID
      },
      method: 'PUT',
      success: (data) => {
        // this.props.changeModalState()
      },
      error: (err) => {
        console.log('Error with POST request:', err);
        this.props.changeModalState()
      }
    })
  }

  reportQuestion(questionID) {
    $.ajax({
      url: `http://localhost:3000/qa/questions/${questionID}/report`,
      data: {
        question_id: questionID
      },
      method: 'PUT',
      success: (data) => {
        // this.props.changeModalState()
      },
      error: (err) => {
        console.log('Error with POST request:', err);
        this.props.changeModalState()
      }
    })
  }

  markAnswerHelpful(answerID) {
    $.ajax({
      url: `http://localhost:3000/qa/answers/${answerID}/helpful`,
      data: {
        answer_id: answerID
      },
      method: 'PUT',
      success: (data) => {
        // this.props.changeModalState()
      },
      error: (err) => {
        console.log('Error with POST request:', err);
        this.props.changeModalState()
      }
    })
  }

  reportAnswer(answerID) {
    $.ajax({
      url: `http://localhost:3000/qa/answers/${answerID}/report`,
      data: {
        answer_id: answerID
      },
      method: 'PUT',
      success: (data) => {
        // this.props.changeModalState()
      },
      error: (err) => {
        console.log('Error with POST request:', err);
        this.props.changeModalState()
      }
    })
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
        <br></br>
        <p> by {a.answerer_name}, {this.formatDate(a.date)} | Helpful? <u onClick={() => { this.markAnswerHelpful(a.id) }}> Yes</u> ({a.helpfulness}) | <u onClick={ () => { this.reportAnswer(a.id) }}>Report</u></p>
      </div>
    )

    if (this.state.displayingAll) {
      var answersInView = <ScrollableList>{answersDiv.slice(0, this.state.answersInDisplay)}</ScrollableList>
    } else {
      var answersInView = answersDiv.slice(0, this.state.answersInDisplay);
    }

    // const answersInView = answersDiv.slice(0, this.state.answersInDisplay);
    if (answersDiv.length > 2) {
      var moreAnswersButton = this.state.displayingAll ? <button onClick={this.collapseAnswers}>Collapse Answers</button> : <button onClick={this.seeMoreAnswers.bind(this)}>SEE MORE ANSWERS</button>
    } else {
      var moreAnswersButton = <div/>
    }

    return (
      <div key={QandA.question_id}>
        Q: {QandA.question_body} Helpful? <u onClick={() => { this.markQuestionHelpful(QandA.question_id) }}> Yes</u> ({QandA.question_helpfulness})  | <u onClick={() => { this.reportQuestion(QandA.question_id) }}>Report</u> | <u onClick={this.changeModalVisibilityState}>Add Answer</u>
          <Container>
            <AnswerModal questionID={QandA.question_id} question={QandA.question_body} productName={this.props.productName} isModalShowing={this.state.isModalShowing} changeModalState={this.changeModalVisibilityState}></AnswerModal>
            {/* <GlobalStyle/> */}
          </Container>
        <div>
          {answersInView}
          {moreAnswersButton}
        </div>
        <div>--------------</div>
      </div>

    )
  }

}

export default QuestionListEntry;