import { reposReducer } from './repos';
import { issueReducer } from './issues';
import { IRepos, IIssue } from '../actions';
import { combineReducers } from 'redux';

export interface IStoreState {
  repos: IRepos[];
  choosedRepo: number;
  loadingRepos: string;
  issue: IIssue;
  loadingIssue: string;
}

export const rootReducer = combineReducers({
  reposReducer,
  issueReducer,
})
export const reducers = rootReducer;
