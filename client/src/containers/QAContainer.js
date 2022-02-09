import { connect } from 'react-redux';
import QA from '../components/QA/wrapper.jsx';
// import pertinent action right here

var mapDispatchToProps = (dispatch) => ({

});

var mapStateToProps = (state) => ({

});

var QAContainer = connect(mapStateToProps, mapDispatchToProps)(QA);
export default QAContainer;