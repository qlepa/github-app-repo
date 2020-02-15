import { IRepos, Action, ActionTypes } from '../actions';

interface IReducerState {
  repos: IRepos[],
  choosedRepo: number,
}

const initialState: IReducerState = {
  repos: [],
  choosedRepo: 0,
}

export const reposReducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case ActionTypes.fetchRepos:
        return {
          ...state,
          repos: action.payload,
        };
      case ActionTypes.setRepo:
        return {
          ...state,
          choosedRepo: action.payload,
        };
      default:
        return state;
    }
  };