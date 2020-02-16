import { reposReducer } from './repos';
import { issueReducer } from './issue';
import { IRepos, IIssue } from '../actions';
import { combineReducers } from 'redux';

export interface IStoreState {
  repos: IRepos[];
  choosedRepo: number;
  loadingRepos: string;
  issue: IIssue;
  loadingIssue: string;
}

const rootReducer = combineReducers({
  reposReducer,
  issueReducer,
})
export const reducers = rootReducer;
