import { IRepos, IIssue, Action, ActionTypes } from '../actions';

interface IReducerState {
  repos: IRepos[],
  choosedRepo: number,
  loadingRepos: string;
}

const initialState: IReducerState = {
  repos: [],
  choosedRepo: 0,
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
          choosedRepo: action.payload,
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