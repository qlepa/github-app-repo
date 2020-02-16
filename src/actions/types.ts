import { IFetchReposAction, ISetRepo, ILoadingRepos } from './repos';
import { ILoadingIssue, IFetchIssueAction } from './issue';

export enum ActionTypes {
  fetchRepos,
  setRepo,
  loadingRepos,
  fetchIssue,
  loadingIssue,
}

export type Action = IFetchReposAction | ISetRepo | ILoadingRepos | ILoadingIssue | IFetchIssueAction;