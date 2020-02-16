 
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Box, Typography, Button } from '@material-ui/core';
import { IRepos, IIssue, fetchIssue } from '../actions';
import { IStoreState } from '../reducers';

interface IProps {
  repos: IRepos[];
  issue: IIssue;
  fetchIssue: Function;
  selectedRepo: number;
  loadingIssue: string;
}

function RandomIssue(props: IProps) {
  const fetchRandomIssue = (): void => {
    if (props.repos.length !== 0) {
      const selectedRepo = props.repos.find((repo: IRepos) => {
            return repo.id === props.selectedRepo
          }) 
          if (selectedRepo) {
            const issueNumber = Math.floor(Math.random()*selectedRepo.open_issues + 1)
            props.fetchIssue(selectedRepo.name, issueNumber)
            console.log(selectedRepo.name)
          }
      }
  } 
  switch (props.loadingIssue) {
    case 'succes':
      return(
        <Box>
          <Typography>Your Issue</Typography>
          <Typography>Title: {props.issue.title}</Typography>
          <Typography>Author: {props.issue.user.login}</Typography>
          <Typography>Labels: {props.issue.labels.length > 0 ? props.issue.labels.map((label) => {return label.name}) : 'No labels'}</Typography>
          <Button onClick={fetchRandomIssue}>RANDOM YOUR ISSUE</Button>
        </Box>
      )
    case 'fail':
      return <Box><Typography>FAIL</Typography></Box>
    case 'loading':
      return <Box><Typography>loading</Typography></Box>
    case 'init':
    default:
      return <Box><Button onClick={fetchRandomIssue}>RANDOM YOUR ISSUE</Button></Box>
    }
}

const mapStateToProps = (state: IStoreState): { repos: IRepos[], selectedRepo: number, issue: IIssue, loadingIssue: string } => {
  return { repos: state.reposReducer.repos, selectedRepo: state.reposReducer.selectedRepo, issue: state.issueReducer.issue, loadingIssue: state.issueReducer.loadingIssue }
};

export default connect(
    mapStateToProps,
    { fetchIssue }
  )(RandomIssue as FunctionComponent);