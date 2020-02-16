import { IIssue, Action, ActionTypes } from '../actions';

interface IReducerState {
  issue: IIssue,
  loadingIssue: string;
}

const initialState: IReducerState = {
  issue: {
    title: '',
    user: {
      login: ''
    },
    labels: [],
  },
  loadingIssue: 'loading',
}

export const issueReducer = (state = initialState, action: Action) => {
    switch (action.type) {
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