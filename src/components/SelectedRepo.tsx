import React, { useState, useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
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

  useEffect(() => {
    if (props.repos.length !== 0) {
      const selectedRepo = props.repos.find((repo: IRepos) => {
        return repo.id === props.selectedRepo
      })
      if (selectedRepo) {
        setData({
          name: selectedRepo.name,
          description: selectedRepo.description,
        })
      }
    }
  }, [props.repos, props.selectedRepo])

  return (
    <Box>
      <Typography>{repo.name}</Typography>
      <Typography>{repo.description}</Typography>
    </Box>
  )
}

const mapStateToProps = (state: IStoreState): { repos: IRepos[], selectedRepo: number } => {
  return { repos: state.reposReducer.repos, selectedRepo: state.reposReducer.selectedRepo }
};

export default compose(
  connect(
    mapStateToProps,
  )
)(SelectedRepo as FunctionComponent);