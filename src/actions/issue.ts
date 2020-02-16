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

export const fetchIssue = (repoName: string, issueNumber: number) => {
  const url = `http://api.github.com/repos/qlepaplayground/${repoName}/issues/${issueNumber}`;
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<IIssue>(url)
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



