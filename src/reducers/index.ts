import { combineReducers } from 'redux';
import { reposReducer } from './repos';
import { IRepos, IChoosedRepo } from '../actions';

export interface IStoreState {
  repos: IRepos[];
  choosedRepo: number;
}

export const reducers = reposReducer;