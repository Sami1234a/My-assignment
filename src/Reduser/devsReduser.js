import { DEVS_DATA_CREATED, DEVS_DATA_LOAD } from "./devsType";

const devReduser = (state, action) => {
  switch (action.type) {
    case DEVS_DATA_LOAD:
      return (state = action.payload);
    // Correct way to return the new state
    case DEVS_DATA_CREATED:
      return [...state, action.payload];

    default:
      return state.filter((data) => data.id !== action.payload); // Keep the existing state if action type doesn't match
  }
};

export default devReduser;
