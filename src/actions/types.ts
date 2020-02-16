import { IFetchReposAction, ISetRepo, ILoadingRepos, ILoadingIssue, IFetchIssueAction } from './repos';

export enum ActionTypes {
  fetchRepos,
  setRepo,
  loadingRepos,
  fetchIssue,
  loadingIssue,
}

export type Action = IFetchReposAction | ISetRepo | ILoadingRepos | ILoadingIssue | IFetchIssueAction;