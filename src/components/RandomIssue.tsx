
import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, makeStyles } from '@material-ui/core';
import { IRepos, fetchIssue } from '../actions';
import { IStoreState } from '../reducers';

const selectRepos = (state: IStoreState) => state.reposReducer.repos;
const selectIssue = (state: IStoreState) => state.issueReducer.issue;
const selectSelectedRepo = (state: IStoreState) => state.reposReducer.selectedRepo;
const selectLoadingIssue = (state: IStoreState) => state.issueReducer.loadingIssue;

type IProps = {}

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '1.5rem',
  },
  btnRandomIssue: {
    fontSize: '1.5rem',
    backgroundColor: '#add2ff',
  },
  error: {
    color: 'red',
  }
}))

function RandomIssue(props: IProps) {
  const repos = useSelector(selectRepos)
  const issue = useSelector(selectIssue)
  const selectedRepo = useSelector(selectSelectedRepo)
  const loadingIssue = useSelector(selectLoadingIssue)
  const dispatch = useDispatch()
  // let disableButton = true 


  const fetchRandomIssue = (): void => {
    if (repos.length !== 0) {
      const userRepo = repos.find((repo: IRepos) => {
        return repo.id === selectedRepo
      })
      if (userRepo) {
        const issueNumber = Math.floor(Math.random() * userRepo.open_issues + 1)
        dispatch(fetchIssue(userRepo.name, issueNumber))
        // disableButton = userRepo.open_issues > 0 ? false : true
      }
    }
  };

  const {
    title: titleClass,
    btnRandomIssue: btnRandomIssueClass,
    error: errorClass,
  } = useStyles(props)

  switch (loadingIssue) {
    case 'succes':
      return (
        <Box>
          <Typography>Your Issue</Typography>
          <Typography>Title: {issue.title}</Typography>
          <Typography>Author: {issue.user.login}</Typography>
          <Typography>Labels: {issue.labels.length > 0 ? issue.labels.map((label) => { return label.name }) : 'No labels'}</Typography>
          <Button className={btnRandomIssueClass} onClick={fetchRandomIssue}>RANDOM YOUR ISSUE</Button>
        </Box>
      )
    case 'fail':
      return <Box><Typography className={errorClass}>FAIL</Typography></Box>
    case 'loading':
      return <Box><Typography>loading</Typography></Box>
    case 'init':
    default:
      return <Box>
          <Typography className={titleClass}>Ready?</Typography>
          <Button className={btnRandomIssueClass} onClick={fetchRandomIssue}>GO FOR IT!</Button>
        </Box>
  }
}

export default RandomIssue as FunctionComponent;