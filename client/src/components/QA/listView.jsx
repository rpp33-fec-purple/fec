import React from 'react';
import $ from 'jquery';
import QuestionListEntry from './questionListEntry.jsx';
import styled from 'styled-components';
import baseUrl from './../../../../config.js';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollableList = styled.div`
    margin: 0 auto;
    min-height: 100px;
    max-height: 550px;
    width: 800px;
    overflow: auto;
    align-items: center;
  `;

const Button = styled.button`
  min-width: 80px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #724060;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  margin-top: 16px
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
      url: `${baseUrl}/qa/questions`,
      data: {
        product_id: this.props.productID,
        page: 1,
        count: 100
      },
      method: 'GET',
      success: (data) => {
        var totalNumOfQs = data.results.length;

        if (totalNumOfQs > this.state.inDisplay) {

          if (this.state.inDisplay + 2 >= totalNumOfQs) {
            this.setState({
              inDisplay: this.state.inDisplay + 2,
              noMoreToDisplay: true
            }, () => {
              this.props.rerenderQandAs(data.results);
            })
          } else {
            this.setState({
              inDisplay: this.state.inDisplay + 2
            }, () => {
              this.props.rerenderQandAs(data.results);
            })
          }
        }
      },
      error: (err) => {
        console.log('Error with GET request:', err);
      }
    });
  }

  render () {
      var questionsList = this.props.qAndAList.map(qa => {

        return (
          <div key={qa.question_id}>
            <QuestionListEntry rerenderQandAs={this.props.rerenderQandAs} qACombo={qa} productName={this.props.productName}/>
          </div>
        )
      })

    const questionsInView = questionsList.slice(0, this.state.inDisplay);
    let moreQuestionsButton = this.state.noMoreToDisplay ? <div/> : <Button onClick={this.seeMoreQuestions.bind(this)}>MORE ANSWERED QUESTIONS</Button>

    return(
      <div id='qaView'>
        <Container>
          <ScrollableList>{questionsInView}</ScrollableList>
        </Container>
        <Container>
        <div>{moreQuestionsButton}</div>
        </Container>
      </div>
    )
  }
}

export default ListView;
