import React, { FunctionComponent, useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import compose from 'recompose/compose'
import { Box, Typography, Button } from '@material-ui/core';
import { IRepos } from '../actions';
import { IStoreState } from '../reducers';

interface IProps {
  repos: IRepos[];
  choosedRepo: number;
}

interface ILabels {
  name?: string;
  color?: string;
}
interface IIssue {
  title: string;
  user: {
    login: string;
  }
  labels: ILabels[];
}

function RandomIssue(props: IProps) {
  const [issue, setData] = useState<IIssue>({
    title: '',
    user: {
      login: ''
    },
    labels: [],
  })

  useEffect(() => {
    if (props.repos.length !== 0) {
      const selectedRepo = props.repos.find((repo: IRepos) => {
        return repo.id === props.choosedRepo
      })
      if (selectedRepo) {
        const issueNumber = Math.round(Math.random()*selectedRepo.open_issues)
        const url = `http://api.github.com/repos/qlepaplayground/${selectedRepo.name}/issues/${issueNumber}`
    
      axios.get(url)
        .then(res => {
          console.log(res.data)
          setData(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }, [props.repos, props.choosedRepo])

  return(
    <Box>
      <Typography>Your Issue</Typography>
      <Typography>Title: {issue.title}</Typography>
      <Typography>Author: {issue.user.login}</Typography>
      <Typography>Labels: {issue.labels.length > 0 ? issue.labels.map((label) => {return label.name}) : 'No labels'}</Typography>
      <Button>Back</Button>
    </Box>
  )
}

const mapStateToProps = (state: IStoreState): { repos: IRepos[], choosedRepo: number } => {
  return { repos: state.repos, choosedRepo: state.choosedRepo }
};

export default compose(
  connect(
    mapStateToProps,
  )
)(RandomIssue as FunctionComponent);