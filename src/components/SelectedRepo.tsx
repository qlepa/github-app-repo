import React, { useState, useEffect, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { IRepos } from '../actions';
import { IStoreState } from '../reducers';

interface IRepo {
  name: string;
  description: string;
}

type IProps = {}

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '1.5rem',
  },
}))

const selectRepos = (state: IStoreState) => state.reposReducer.repos;
const selectSelectedRepo = (state: IStoreState) => state.reposReducer.selectedRepo;

function SelectedRepo(props: IProps) {
  const [repo, setRepo] = useState<IRepo>({ name: 'Choose repository', description: '' });
  const repos = useSelector(selectRepos);
  const selectedRepo = useSelector(selectSelectedRepo);

  useEffect(() => {
    if (repos.length !== 0) {
      const userRepo = repos.find((repo: IRepos) => {
        return repo.id === selectedRepo
      })
      if (userRepo) {
        setRepo({
          name: userRepo.name,
          description: userRepo.description,
        })
      }
    }
  }, [repos, selectedRepo])

  const {
    title: titleClass,
  } = useStyles(props)

  return (
    <Box>
      <Typography className={titleClass}>{repo.name}</Typography>
      <Typography>{repo.description}</Typography>
    </Box>
  )
}

export default SelectedRepo as FunctionComponent;