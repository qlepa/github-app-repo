import { reposReducer } from './repos';
import { issueReducer } from './issue';
import { IRepos, IIssue } from '../actions';
import { combineReducers } from 'redux';

export interface IStoreState {
  reposReducer: {
    repos: IRepos[];
    selectedRepo: number;
    loadingRepos: string;
  }
  issueReducer: {
    issue: IIssue;
    loadingIssue: string;
  }
}

const rootReducer = combineReducers({
  reposReducer,
  issueReducer,
})

export const reducers = rootReducer;