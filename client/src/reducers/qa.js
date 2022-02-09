import Redux from 'redux';


var qAReducer = (state = null, action) => {
  switch (action.type) {
    case 'your action type here':
      return /* relevant property of the action ||*/  null;
    default:
      return state;
  };
};

export default qAReducer;