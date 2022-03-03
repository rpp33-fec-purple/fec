import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import AnswerModal from './Modals/addAnswerModal.jsx';

const Container = styled.div`
  display: flex;
  justify-content: left;
  // align-items: center;
  // height: 10vh;
  // box-sizing: border-box;
  // margin: 0;
  padding: 8px;
  width: 800px;


  position: inherit;
`;

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


  const ImageThumbnail = styled.img`
    border: 2px solid #C0C0C0;
    padding: 5px;
    margin-right: 5px;
    margin-left: 5px;
    margin-top: 2.5px;
    margin-bottom: 2.5px;

  `;

  const QuestionBox = styled.div`
    .questionBox {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      width: 780px;

    }
    .push {
        margin-left: auto;
        // padding-left: 140px;
        justify-content: right;
        font-size: 14px;
        font-color: #36454F;
    }
    .question {
      width: 28.12em;
      flex-wrap: wrap;
      overflow-wrap: anywhere;
    }

    .report {
      padding-left: 3px;
      padding-right: 3px;
    }
    .answer {
      padding-left: 3px;
    }
  `;

  const AnswersButton = styled.button`
  .button-48 {
    appearance: none;
    background-color: #FFFFFF;
    border-width: 0;
    box-sizing: border-box;
    color: #000000;
    cursor: pointer;
    display: inline-block;
    font-family: Clarkson,Helvetica,sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: .7em;
    opacity: 1;
    outline: 0;
    padding: .8em 1.6em;
    position: relative;
    text-align: center;
    text-rendering: geometricprecision;
    transition: opacity 300ms cubic-bezier(.694, 0, 0.335, 1),background-color 100ms cubic-bezier(.694, 0, 0.335, 1),color 100ms cubic-bezier(.694, 0, 0.335, 1);
    touch-action: manipulation;
    vertical-align: baseline;
    white-space: nowrap;
  }

  .button-48:before {
    animation: opacityFallbackOut .5s step-end forwards;
    backface-visibility: hidden;
    background-color: #EBEBEB;
    clip-path: polygon(-1% 0, 0 0, -25% 100%, -1% 100%);
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translateZ(0);
    transition: clip-path .5s cubic-bezier(.165, 0.84, 0.44, 1), -webkit-clip-path .5s cubic-bezier(.165, 0.84, 0.44, 1);
    width: 100%;
  }

  .button-48:hover:before {
    animation: opacityFallbackIn 0s step-start forwards;
    clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
  }

  .button-48:after {
    background-color: #FFFFFF;
  }

  .button-48 span {
    z-index: 1;
    position: relative;
  }
  `;

class QuestionListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      answersInDisplay: 2,
      displayingAll: false,
      isModalShowing: false,
      updatedAnswersList: [],
      answersMarkedHelpful: []
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
    var questionMarkedHelpful = false;
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
        console.log('these are the answers', data.results)
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
    var buttonID = event.target.id;

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
            // var buttonsMarkedHelpful = this.state.answersMarkedHelpful.push(buttonID);
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
          var seller = <strong key={a.answerer_name}>{a.answerer_name}</strong>
        }

        if (a.photos.length === 0) {
          var photosDiv = <></>;
        } else {
          var photosDiv = a.photos.map(photo => {
            return (
              <ImageThumbnail key={photo.url} src={photo.url} width='200'></ImageThumbnail>
            )
          })
        }

        return (
          <div key={a.answer_id}>
            {a.body}
          <br></br>
          <>{photosDiv}</>

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
          var seller = <strong key={a.answerer_name}>{a.answerer_name}</strong>
        }


        if (a.photos.length === 0) {
          var photosDiv = <></>;
        } else {
          var photosDiv = a.photos.map(photo => {
            return (
              <ImageThumbnail key={photo.url} src={photo.url} width='2000'></ImageThumbnail>
            )
          })
        }

        return (
          <div key={a.id}>
            {a.body}
            <br></br>
            <>{photosDiv}</>
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
      // var moreAnswersButton = this.state.displayingAll ? <button onClick={this.collapseAnswers}>Collapse Answers</button> : <button onClick={this.seeMoreAnswers.bind(this)}>SEE MORE ANSWERS</button>
      var moreAnswersButton = this.state.displayingAll ? <AnswersButton><button onClick={this.collapseAnswers} class="button-48" role="button"><span class="text">COLLAPSE ANSWERS</span></button></AnswersButton> : <AnswersButton><button onClick={this.seeMoreAnswers.bind(this)} class="button-48" role="button"><span class="text">SEE MORE ANSWERS</span></button> </AnswersButton>

    } else {
      var moreAnswersButton = <div/>
    }

    var answersTitle = answersDiv.length > 0 ? <strong>A:</strong> : <></>

    return (
      <Container>

        <div key={this.props.qACombo.question_id} >
          <QuestionBox className='questionBox'>
            <div className='questionBox'>
              <div className='question'>
                <strong>Q: {this.props.qACombo.question_body}</strong>
              </div>
              <div className='push'>
                Helpful? <u id={this.props.qACombo.question_id + 'helpful'} onClick={ () => { this.markQuestionHelpful(this.props.qACombo.question_id) } }> Yes </u> ({this.props.qACombo.question_helpfulness})
                |  <u className='report' id={this.props.qACombo.question_id + 'report'} onClick={() => { this.reportQuestion(this.props.qACombo.question_id) }}> Report </u>  |  <u className='answer' onClick={() => { this.changeModalVisibilityState(false) }}> Add Answer</u>
              </div>
            </div>
          </QuestionBox>
          <div>
           {/* <Container> */}
           <AnswerModal questionID={this.props.qACombo.question_id} question={this.props.qACombo.question_body} productName={this.props.productName} isModalShowing={this.state.isModalShowing} changeModalState={this.changeModalVisibilityState}></AnswerModal>
            {/* </Container> */}
          <div>
          {/* <strong>A:</strong> */}
            {answersTitle}
            {answersInView}
            {moreAnswersButton}
          </div>

          </div>
        </div>
      </Container>

    )
  }

}

export default QuestionListEntry;


