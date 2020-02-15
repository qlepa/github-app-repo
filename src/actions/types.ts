import { IFetchReposAction, ISetRepo } from './repos';

export enum ActionTypes {
  fetchRepos,
  setRepo,
}

export type Action = IFetchReposAction | ISetRepo;