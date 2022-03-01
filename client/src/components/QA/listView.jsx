import React from 'react';
import $ from 'jquery';
import QuestionListEntry from './questionListEntry.jsx';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  // height: 70%;
  // box-sizing: border-box;
  // margin: 0;
  // padding: 0;
  // font-family: 'Arial', sans-serif;
`

const ScrollableList = styled.div`
      margin: 0 auto;
      // height: 250px;
      min-height: 100px;
      max-height: 550px;
      // max-height:75%;
      width: 800px;
      overflow: auto;
      border: 1px solid black;
      // display: flex;
      // justify-content: center;
      align-items: center;
  `;

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      inDisplay: 2,
      noMoreToDisplay: false,
      updatedQandAList: []
    }
    this.seeMoreQuestions = this.seeMoreQuestions.bind(this);
  }

  seeMoreQuestions() {
    $.ajax({
      url: `http://localhost:3000/qa/questions`,
      data: {
        product_id: this.props.productID,
        page: 1,
        count: 100
      },
      method: 'GET',
      success: (data) => {
        console.log('data in client', data);

        var totalNumOfQs = data.results.length;

        if (totalNumOfQs > this.state.inDisplay){
          if (this.state.inDisplay + 2 >= totalNumOfQs) {
            this.setState({
              inDisplay: this.state.inDisplay + 2,
              noMoreToDisplay: true,
              updatedQandAList: data.results
            })
          } else {
            this.setState({
              inDisplay: this.state.inDisplay + 2,
              updatedQandAList: data.results
            })
          }
        }

      },
      error: (err) => {
        console.log('Error with GET request:', err);
      }
    });


    // var totalNumOfQs = this.props.qAndAList.length;

    // if (totalNumOfQs > this.state.inDisplay){
    //   if (this.state.inDisplay + 2 >= totalNumOfQs) {
    //     this.setState({
    //       inDisplay: this.state.inDisplay + 2,
    //       noMoreToDisplay: true
    //     })
    //   } else {
    //     this.setState({
    //       inDisplay: this.state.inDisplay + 2
    //     })
    //   }
    // }

  }

  render () {

    if (this.state.updatedQandAList.length > 0) {
      var questionsList = this.state.updatedQandAList.map(qa => {

        return (
          <div key={qa.question_id}>
            <QuestionListEntry rerenderQandAs={this.props.rerenderQandAs} qACombo={qa} productName={this.props.productName}/>
          </div>
        )
      })

    } else {
      var questionsList = this.props.qAndAList.map(qa => {

        return (
          <div key={qa.question_id}>
            <QuestionListEntry rerenderQandAs={this.props.rerenderQandAs} qACombo={qa} productName={this.props.productName}/>
          </div>
        )
      })
    }


    const questionsInView = questionsList.slice(0, this.state.inDisplay);
    let moreQuestionsButton = this.state.noMoreToDisplay ? <div/> : <button onClick={this.seeMoreQuestions.bind(this)}>MORE ANSWERED QUESTIONS</button>

    return(
      <div id='qaView'>
        <Container>
          <ScrollableList>{questionsInView}</ScrollableList>
        </Container>
        <div>{moreQuestionsButton}</div>
      </div>
    )
  }
}

export default ListView;

////////////////////////////////////////////////////////

////////////////////////////////////////////////////////

////////////////////////////////////////////////////////

////////////////////////////////////////////////////////


// import React from 'react';
// import $ from 'jquery';


// class ListView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state= {
//       inDisplay: 2,
//       noMoreToDisplay: false
//     }
//     this.seeMoreQuestions = this.seeMoreQuestions.bind(this);
//     this.seeMoreAnswers = this.seeMoreAnswers.bind(this);
//   }

//   seeMoreQuestions() {
//     var totalNumOfQs = this.props.qAndAList.length;
//     console.log('list', this.props.qAndAList)



//     if (totalNumOfQs > this.state.inDisplay){
//       if (this.state.inDisplay + 2 >= totalNumOfQs) {
//         this.setState({
//           inDisplay: this.state.inDisplay + 2,
//           noMoreToDisplay: true
//         })
//       } else {
//         this.setState({
//           inDisplay: this.state.inDisplay + 2
//         })
//       }
//     }
//   }

//   seeMoreAnswers() {
//     // make api call here to get all the answers?
//   }

//   render (){
//     const questionsList = this.props.qAndAList.map(qa => {
//       var answers = [];
//       for (var key in qa.answers) {
//         answers.push(qa.answers[key])
//       }
//       var answersDiv = answers.map(a =>
//         <div key={a.id}>
//           A: {a.body}
//           <br></br> by {a.answerer_name}, {a.date} | Helpful? Yes ({a.helpfulness}) | Report
//         </div>
//       )
//       return (
//         <li key={qa.question_id}>
//         Q: {qa.question_body}
//         <br></br> Helpful? Yes ({qa.question_helpfulness}) | Add Answer
//         <div>
//           {answersDiv}
//           <button onClick={this.seeMoreAnswers.bind(this)}>SEE MORE ANSWERS</button>
//         </div>
//       </li>
//       )
//     })

//     const questionsInView = questionsList.slice(0, this.state.inDisplay);
//     let moreQuestionsButton = this.state.noMoreToDisplay ? <div/> : <button onClick={this.seeMoreQuestions.bind(this)}>MORE ANSWERED QUESTIONS</button>

//     return (
//       <div id='qaView'>
//         <ul>{questionsInView}</ul>
//         <div>{moreQuestionsButton}</div>
//       </div>
//     )
//   }
// }

// export default ListView;