import React from 'react';

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let view;
    let meta = this.props.meta;
    let reviews = this.props.reviews;
    if (reviews.results) {
      view =
      <div>
       <label>{reviews.results.length} reviews, sorted by </label>
       <select name="sort" id="sort">
         <option value="relevance">relevance</option>
         <option value="helpfulness">helpfulness</option>
         <option value="newest">newest</option>
       </select>
     </div>

    } else {
      view = null;
    }

    return (
      <div>{view}</div>
    )
  }
}

export default List;
