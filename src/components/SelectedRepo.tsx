import React, { useState, useEffect, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import compose from 'recompose/compose'
import { Box, Typography } from '@material-ui/core';
import { IRepos } from '../actions';
import { IStoreState } from '../reducers';

interface IProps {
  repos: IRepos[];
  selectedRepo: number;
}

interface IRepo {
  name: string;
  description: string;
}

function SelectedRepo(props: IProps) {
  const [repo, setData] = useState<IRepo>({ name: 'Choose repository', description: '' });
  const repos = useSelector((state: IStoreState) => state.reposReducer.repos);
  const selectedRepo = useSelector((state: IStoreState) => state.reposReducer.selectedRepo);

  useEffect(() => {
    if (repos.length !== 0) {
      const userRepo = repos.find((repo: IRepos) => {
        return repo.id === selectedRepo
      })
      if (userRepo) {
        setData({
          name: userRepo.name,
          description: userRepo.description,
        })
      }
    }
  }, [repos, selectedRepo])

  return (
    <Box>
      <Typography>{repo.name}</Typography>
      <Typography>{repo.description}</Typography>
    </Box>
  )
}

// const mapStateToProps = (state: IStoreState): { repos: IRepos[], selectedRepo: number } => {
//   return { repos: state.reposReducer.repos, selectedRepo: state.reposReducer.selectedRepo }
// };

export default SelectedRepo as FunctionComponent;