import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

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

const headers = {
  "Authorization" : `Token 43a52db76bc30c22fbfe93c96bb15c1e161cc678`
}

export const fetchRepos = () => {
  const url = 'https://api.github.com/users/qlepaplayground/repos';
  // const url = 'https://api.github.com/rate_limit'
  return async (dispatch: Dispatch) => {
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

export const setRepo = (selectedRepo: number) => {
  return (dispatch: Dispatch) => {
    dispatch<ISetRepo>({
      type: ActionTypes.setRepo,
      payload: selectedRepo,
    })
  }
};