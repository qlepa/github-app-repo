import { IRepos, IIssue, Action, ActionTypes } from '../actions';

interface IReducerState {
  repos: IRepos[],
  choosedRepo: number,
  loadingRepos: string;
  issue: IIssue,
  loadingIssue: string;
}

const initialState: IReducerState = {
  repos: [],
  choosedRepo: 0,
  loadingRepos: 'loading',
  issue: {
    title: '',
    user: {
      login: ''
    },
    labels: [],
  },
  loadingIssue: '',
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
      case ActionTypes.fetchIssue:
        return {
          ...state,
          issue: action.payload,
      }
      case ActionTypes.loadingIssue:
        return {
          ...state,
          loadingIssue: action.payload,
        }
      default:
        return state;
    }
  };