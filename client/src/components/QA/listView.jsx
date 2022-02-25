import React from 'react';
import $ from 'jquery';
import QuestionListEntry from './questionListEntry.jsx'

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
    var totalNumOfQs = this.props.qAndAList.length;
    // console.log('list', this.props.qAndAList)

    if (totalNumOfQs > this.state.inDisplay){
      if (this.state.inDisplay + 2 >= totalNumOfQs) {
        this.setState({
          inDisplay: this.state.inDisplay + 2,
          noMoreToDisplay: true
        })
      } else {
        this.setState({
          inDisplay: this.state.inDisplay + 2
        })
      }
    }
  }

  render () {
    const questionsList = this.props.qAndAList.map(qa => {

      return (
        <div key={qa.question_id}>
          <QuestionListEntry qACombo={qa} productName={this.props.productName}/>
        </div>
      )
    })
    const questionsInView = questionsList.slice(0, this.state.inDisplay);
    let moreQuestionsButton = this.state.noMoreToDisplay ? <div/> : <button onClick={this.seeMoreQuestions.bind(this)}>MORE ANSWERED QUESTIONS</button>

    return(
      <div id='qaView'>
        <div>{questionsInView}</div>
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