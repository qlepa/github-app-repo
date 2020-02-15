import { reposReducer } from './repos';
import { IRepos } from '../actions';

export interface IStoreState {
  repos: IRepos[];
  choosedRepo: number;
}

export const reducers = reposReducer;