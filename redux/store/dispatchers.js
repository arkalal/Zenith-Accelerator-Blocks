import Actions from "./actions";

export const dispatchSelectedOption = (data) => {
  return {
    type: Actions.SELECTED_OPTION,
    data,
  };
};
