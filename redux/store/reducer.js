import Actions from "./actions";

const defaultState = {
  selectedOption: "Question & Answer",
};

const gradientReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Actions.SELECTED_OPTION:
      return {
        ...state,
        selectedOption: action.data,
      };

    default:
      return {
        ...state,
      };
  }
};

export default gradientReducer;
