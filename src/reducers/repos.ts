import { IRepos, Action, ActionTypes } from '../actions';

interface IReducerState {
  repos: IRepos[],
  selectedRepo: number,
  loadingRepos: string;
}

const initialState: IReducerState = {
  repos: [],
  selectedRepo: 0,
  loadingRepos: 'loading',
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
          selectedRepo: action.payload,
        };
      case ActionTypes.loadingRepos:
        return {
          ...state,
          loadingRepos: action.payload,
        }
      default:
        return state;
    }
  };