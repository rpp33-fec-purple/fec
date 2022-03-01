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
      isModalShowing: false,
      updatedAnswersList: []
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
    this.disableButton = this.disableButton.bind(this);

    var newAnswerAdded = false;
    var answerMarkedHelpful = false;
    var seeMoreAnswersClicked = false;
    var collapseAnswersClicked = false;
  }

  changeModalVisibilityState(answerAdded) {

    if (answerAdded) {
      $.ajax({
        url: `http://localhost:3000/qa/questions/${this.props.qACombo.question_id}/answers`,
        data: {
          question_id: this.props.qACombo.question_id,
          page: 1,
          count: 100
        },
        method: 'GET',
        success: (data) => {
          this.newAnswerAdded = true;

          this.setState({
            isModalShowing: !this.state.isModalShowing,
            updatedAnswersList: data.results
          })
        },
        error: (err) => {
          console.log('Error with POST request:', err);
          this.setState({
            isModalShowing: !this.state.isModalShowing
          })
        }
      })
    } else {
    this.setState({
      isModalShowing: !this.state.isModalShowing
    }, ()=> {
      console.log('is modal showing in changestate func', this.state.isModalShowing)
    })

    }
  }

  collapseAnswers() {
    $.ajax({
      url: `http://localhost:3000/qa/questions/${this.props.qACombo.question_id}/answers`,
      data: {
        question_id: this.props.qACombo.question_id,
        page: 1,
        count: 100
      },
      method: 'GET',
      success: (data) => {
        var totalNumOfAs = data.results.length;
        this.collapseAnswersClicked = true;
        this.setState({
          answersInDisplay: 2,
          displayingAll: false,
          updatedAnswersList: data.results
        })
      },
      error: (err) => {
        console.log('Error with GET request:', err);
      }
    })
  }

  seeMoreAnswers() {
    $.ajax({
      url: `http://localhost:3000/qa/questions/${this.props.qACombo.question_id}/answers`,
      data: {
        question_id: this.props.qACombo.question_id,
        page: 1,
        count: 100
      },
      method: 'GET',
      success: (data) => {
        var totalNumOfAs = data.results.length;
        this.seeMoreAnswersClicked = true;
        if (totalNumOfAs > this.state.answersInDisplay) {
          this.setState({
            answersInDisplay: totalNumOfAs,
            displayingAll: true,
            updatedAnswersList: data.results
          })
        }
      },
      error: (err) => {
        console.log('Error with GET request:', err);
      }
    })
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
    console.log('event target id', event.target)
    this.disableButton(event.target.id);

    $.ajax({
      url: `http://localhost:3000/qa/questions/${questionID}/helpful`,
      data: {
        question_id: questionID
      },
      method: 'PUT',
      success: (data) => {
        this.props.rerenderQandAs()
      },
      error: (err) => {
        console.log('Error with POST request:', err);
      }
    })
  }

  reportQuestion(questionID) {
    console.log('event target id', event.target)
    this.disableButton(event.target.id);
    var buttonID = event.target.id;

    $.ajax({
      url: `http://localhost:3000/qa/questions/${questionID}/report`,
      data: {
        question_id: questionID
      },
      method: 'PUT',
      success: (data) => {
        $(`#${buttonID}`).html('Reported');
      },
      error: (err) => {
        console.log('Error with POST request:', err);
      }
    })
  }

  markAnswerHelpful(answerID) {
    console.log('event target id', event.target)
    var buttonID = event.target.id;

    $.ajax({
      url: `http://localhost:3000/qa/answers/${answerID}/helpful`,
      data: {
        answer_id: answerID
      },
      method: 'PUT',
      success: (data) => {
        $.ajax({
          url: `http://localhost:3000/qa/questions/${this.props.qACombo.question_id}/answers`,
          data: {
            question_id: this.props.qACombo.question_id,
            page: 1,
            count: 100
          },
          method: 'GET',
          success: (data) => {
            this.answerMarkedHelpful = true;
            this.disableButton(buttonID);
            console.log('Successfully marking answer as helpful')
            this.setState({
              updatedAnswersList: data.results
            })
          },
          error: (err) => {
            console.log('Error with GET request:', err);
          }
        })
      },
      error: (err) => {
        console.log('Error with answer PUT request when marking helpful:', err);
      }
    })
  }

  reportAnswer(answerID) {
    console.log('event target id', event.target)

    this.disableButton(event.target.id);
    var buttonID = event.target.id;

    $.ajax({
      url: `http://localhost:3000/qa/answers/${answerID}/report`,
      data: {
        answer_id: answerID
      },
      method: 'PUT',
      success: (data) => {
        $(`#${buttonID}`).html('Reported');
      },
      error: (err) => {
        console.log('Error with POST request:', err);
      }
    })
  }

  disableButton(buttonID) {
    document.getElementById(buttonID).style.pointerEvents = 'none';
  }

  render(){
    var answers = [];
    var answersDiv;

    if (this.newAnswerAdded || this.answerMarkedHelpful || this.seeMoreAnswersClicked || this.collapseAnswersClicked) {
      this.newAnswerAdded = false;
      this.answerMarkedHelpful = false;
      this.seeMoreAnswersClicked = false;
      this.collapseAnswersClicked = false;
      var sorted = this.sortAnswers(this.state.updatedAnswersList);

      answersDiv = sorted.map(a => {
        if (a.answerer_name === 'Seller') {
          var seller = <strong>{a.answerer_name}</strong>
        }
        return (
          <div key={a.answer_id}>
          A: {a.body}
          <br></br>
          <p> by {seller || a.answerer_name}, {this.formatDate(a.date)} | Helpful? <u id={a.answer_id + 'helpful'} onClick={() => { this.markAnswerHelpful(a.answer_id) }}> Yes</u> ({a.helpfulness}) | <u id={a.answer_id + 'report'} onClick={ () => { this.reportAnswer(a.answer_id) }}> Report</u></p>
        </div>
        )
      }
      )
    } else {
      var QandA = this.props.qACombo;
      for (var key in QandA.answers) {
        answers.push(QandA.answers[key])
      }
      var sorted = this.sortAnswers(answers);
      answersDiv = sorted.map(a => {
        if (a.answerer_name === 'Seller') {
          var seller = <strong>{a.answerer_name}</strong>
        }
        return (
          <div key={a.id}>
            A: {a.body}
            <br></br>
            <p> by {seller || a.answerer_name}, {this.formatDate(a.date)} | Helpful? <u id={a.answer_id + 'helpful'} onClick={() => { this.markAnswerHelpful(a.id) }}> Yes</u> ({a.helpfulness}) | <u id={a.answer_id + 'report'} onClick={ () => { this.reportAnswer(a.id) }}>Report</u></p>
          </div>
        )
      }
      )
    }

    if (this.state.displayingAll) {
      var answersInView = <ScrollableList>{answersDiv.slice(0, this.state.answersInDisplay)}</ScrollableList>
    } else {
      var answersInView = answersDiv.slice(0, this.state.answersInDisplay);
    }

    if (answersDiv.length > 2) {
      var moreAnswersButton = this.state.displayingAll ? <button onClick={this.collapseAnswers}>Collapse Answers</button> : <button onClick={this.seeMoreAnswers.bind(this)}>SEE MORE ANSWERS</button>
    } else {
      var moreAnswersButton = <div/>
    }

    return (
      <div key={this.props.qACombo.question_id}>
        Q: {this.props.qACombo.question_body} Helpful? <u id={this.props.qACombo.question_id + 'helpful'} onClick={ () => { this.markQuestionHelpful(this.props.qACombo.question_id) } }> Yes</u> ({this.props.qACombo.question_helpfulness})  | <u id={this.props.qACombo.question_id + 'report'} onClick={() => { this.reportQuestion(this.props.qACombo.question_id) }}>Report</u> | <u onClick={() => { this.changeModalVisibilityState(false) }}>Add Answer</u>
          <Container>
            <AnswerModal questionID={this.props.qACombo.question_id} question={this.props.qACombo.question_body} productName={this.props.productName} isModalShowing={this.state.isModalShowing} changeModalState={this.changeModalVisibilityState}></AnswerModal>
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