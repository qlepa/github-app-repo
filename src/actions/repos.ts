import axios from 'axios';
import { AnyAction } from 'redux';
import { ActionTypes } from './types';
import { IStoreState } from '../reducers';
import { ThunkAction } from 'redux-thunk';
import { headers } from '../constans'

export interface IRepos {
  id: number;
  name: string;
  open_issues: number;
  owner: {
    login: string;
    avatar_url: string;
  }
  description: string;
}

export interface ISelectedRepo {
  id: number;
}

export interface IFetchReposAction {
  type: ActionTypes.fetchRepos;
  payload: IRepos[];
}

export interface ISetRepo {
  type: ActionTypes.setRepo;
  payload: number;
}

export interface ILoadingRepos {
  type: ActionTypes.loadingRepos;
  payload: string;
}

export const fetchRepos = (): ThunkAction<void, IStoreState, any, AnyAction> => {
  const url = 'https://api.github.com/users/qlepaplayground/repos';

  return async (dispatch) => {
    try {
      const response = await axios.get<IRepos[]>(url, {
        headers: headers
      })

      dispatch<ILoadingRepos>({
        type: ActionTypes.loadingRepos,
        payload: 'loading',
      });

      dispatch<IFetchReposAction>({
        type: ActionTypes.fetchRepos,
        payload: response.data
      });

      dispatch<ILoadingRepos>({
        type: ActionTypes.loadingRepos,
        payload: 'succes',
      });
    } catch (error) {
      dispatch<ILoadingRepos>({
        type: ActionTypes.loadingRepos,
        payload: 'fail',
      })
      console.log(error)
    }
  };
};

export const setRepo = (selectedRepo: number): ThunkAction<void, IStoreState, any, AnyAction> => {
  return (dispatch) => {
    dispatch<ISetRepo>({
      type: ActionTypes.setRepo,
      payload: selectedRepo,
    })
  }
};