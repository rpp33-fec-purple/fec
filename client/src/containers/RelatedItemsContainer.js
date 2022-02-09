import { connect } from 'react-redux';
import RelatedItems from '../components/RelatedItems/wrapper.jsx';
// import pertinent action right here

var mapDispatchToProps = (dispatch) => ({

});

var mapStateToProps = (state) => ({

});

var RelatedItemsContainer = connect(mapStateToProps, mapDispatchToProps)(RelatedItems);
export default RelatedItemsContainer;