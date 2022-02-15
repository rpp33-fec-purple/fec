import React from 'react';

class styleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }
  // componentDidMount() {

  // }
  render() {
    return (
      <div className='styleSelector'>
        Style > <span>{this.props.styleInfo[0].name}</span>
      </div>
    );
  }
}

export default styleSelector;