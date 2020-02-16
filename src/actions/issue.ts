import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

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

const headers = {
  "Authorization" : `Token 43a52db76bc30c22fbfe93c96bb15c1e161cc678`
}

export const fetchIssue = (repoName: string, issueNumber: number) => {
  const url = `https://api.github.com/repos/qlepaplayground/${repoName}/issues/${issueNumber}`;
  return async (dispatch: Dispatch) => {
    try {
      dispatch<ILoadingIssue>({
        type: ActionTypes.loadingIssue,
        payload: 'loading',
      });

      const response = await axios.get<IIssue>(url, {
        headers: headers,
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


