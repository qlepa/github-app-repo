import { reposReducer } from './repos';
import { IRepos, IIssue } from '../actions';

export interface IStoreState {
  repos: IRepos[];
  choosedRepo: number;
  loadingRepos: string;
  issue: IIssue;
  loadingIssue: string;
}

export const reducers = reposReducer;