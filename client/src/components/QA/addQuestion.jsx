import React from 'react';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.addAQ = this.addAQ.bind(this);
  }

  addAQ(){
    console.log('Add a question clicked!')
  }


  render() {
    return (
      <div id='addQuestionButton'>
        <button onClick={this.addAQ}>ADD A QUESTION +</button>
      </div>
    )
  }
}

export default AddQuestion;