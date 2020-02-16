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

export interface IChoosedRepo {
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

const url = 'https://api.github.com/users/qlepaplayground/repos';

export const fetchRepos = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<IRepos[]>(url)

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

export const setRepo = (choosedRepo: number) => {
  return (dispatch: Dispatch) => {
    dispatch<ISetRepo>({
      type: ActionTypes.setRepo,
      payload: choosedRepo,
    })
  }
};
