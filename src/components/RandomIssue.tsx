 
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Box, Typography, Button } from '@material-ui/core';
import { IRepos, IIssue, fetchIssue } from '../actions';
import { IStoreState } from '../reducers';

interface IProps {
  repos: IRepos[];
  issue: IIssue;
  fetchIssue: Function;
  choosedRepo: number;
  loadingIssue: string;
}

function RandomIssue(props: IProps) {
  const randomIssue = (): void => {
    if (props.repos.length !== 0) {
      const selectedRepo = props.repos.find((repo: IRepos) => {
            return repo.id === props.choosedRepo
          }) 
          if (selectedRepo) {
            const issueNumber = Math.round(Math.random()*selectedRepo.open_issues)
            console.log('repo name i issue number', selectedRepo.name, issueNumber)
            props.fetchIssue(selectedRepo.name, issueNumber)
          }
      }
  }

  return(
    <Box>
      <Typography>Your Issue</Typography>
      {/* <Typography>Title: {props.issue.title}</Typography> */}
      {/* <Typography>Author: {issue.user.login}</Typography>
      <Typography>Labels: {issue.labels.length > 0 ? issue.labels.map((label) => {return label.name}) : 'No labels'}</Typography> */}
      <Button onClick={randomIssue}>RANDOM YOUR ISSUE</Button>
    </Box>
  )
}

// const mapStateToProps = ({ repos }: IStoreState): { repos: IRepos[] } => {
//   return { repos };
// };

// export const App = connect(
//   mapStateToProps,
//   { fetchRepos, setRepo }
// )(_App)

const mapStateToProps = (state: IStoreState): { repos: IRepos[], choosedRepo: number, issue: IIssue, loadingIssue: string } => {
  return { repos: state.reposReducer.repos, choosedRepo: state.reposReducer.choosedRepo, issue: state.issueReducer.issue, loadingIssue: state.issueReducer.loadingIssue }
};

export default connect(
    mapStateToProps,
    { fetchIssue }
  )(RandomIssue as FunctionComponent);