import React from 'react';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
  }
  // {this.props.data}
  render() {
    return (
      <h2>Related Items and Outfit Component</h2>
      // < RelatedItems data = {this.state.items} --> connect(mapStateToProps)(RelatedItems)
    )
  }
}

export default RelatedItems;
/*
 mapStateToProps = (state) => {
 return {
   data: state.items
 }
};





*/