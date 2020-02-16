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

interface ILabels {
  name?: string;
  color?: string;
}

export interface IIssue {
  title: string;
  user: {
    login: string;
  }
  labels: ILabels[];
}

export interface IFetchIssueAction {
  type: ActionTypes.fetchIssue;
  payload: IIssue;
}

export interface ILoadingIssue {
  type: ActionTypes.loadingIssue;
  payload: string;
}

export interface ILoadingRepos {
  type: ActionTypes.loadingRepos;
  payload: string;
}

const headers = {
  "Authorization" : `OAuth f03dc974f5f3ee3285d517428cff2a039deb02ba`
}

export const fetchRepos = () => {
  const url = 'https://api.github.com/users/qlepaplayground/repos';
  
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

export const setRepo = (choosedRepo: number) => {
  return (dispatch: Dispatch) => {
    dispatch<ISetRepo>({
      type: ActionTypes.setRepo,
      payload: choosedRepo,
    })
  }
};

export const fetchIssue = (repoName: string, issueNumber: number) => {
  const url = `http://api.github.com/repos/qlepaplayground/${repoName}/issues/${issueNumber}`;
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<IIssue>(url, 
        {
        headers: headers,
      }
      )
      console.log(response)

      dispatch<ILoadingIssue>({
        type: ActionTypes.loadingIssue,
        payload: 'loading',
      });

      dispatch<IFetchIssueAction>({
        type: ActionTypes.fetchIssue,
        payload: response.data
      });

      dispatch<ILoadingIssue>({
        type: ActionTypes.loadingIssue,
        payload: 'succes',
      });
    } catch (error) {
      dispatch<ILoadingIssue>({
        type: ActionTypes.loadingIssue,
        payload: 'fail',
      })
      console.log(error)
    }
  };
};



