import React, { FunctionComponent, useState, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import { IStoreState } from '../reducers';
import { IRepos } from '../actions';

interface IProps {
  repos: IRepos[];
  choosedRepo: number;
}

function NewIssue(props: IProps) {
  const [issueTitle, setInputValues] = useState('');

  const handleOnChange = useCallback(event => {
    const { value } = event.target;

    setInputValues(value);
  }, []);

  const createIssue = function(): void {
    if (props.repos.length !== 0) {
      const selectedRepo = props.repos.find((repo: IRepos) => {
          return repo.id === props.choosedRepo
      }) 
      if (selectedRepo) {
        const url = `https://api.github.com/repos/qlepaplayground/${selectedRepo.name}/issues`
        axios({
          method: 'POST',
          url: url,
          headers: {
            "Authorization" : `Token 43a52db76bc30c22fbfe93c96bb15c1e161cc678`,
          },
          data: {
            title: issueTitle,
          } 
        })
      }
    }

  }
  return(
    <Box>
      <Typography>Add new issue</Typography>
      <Input onChange={handleOnChange} />
      <Button onClick={createIssue}>NEW</Button>
    </Box>
  )
}

const mapStateToProps = (state: IStoreState): { repos: IRepos[], choosedRepo: number, } => {
  return { repos: state.reposReducer.repos, choosedRepo: state.reposReducer.choosedRepo, }
};

export default connect(
    mapStateToProps,
  )(NewIssue as FunctionComponent);