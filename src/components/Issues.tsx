import React, { useState, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose'
import { Box, Button } from '@material-ui/core';
import { IRepos } from '../actions';
import { IStoreState } from '../reducers';
import RandomIssue from './RandomIssue';
import NewIssue from './NewIssue';

interface IProps {
  repos: IRepos[],
}

function Issues(props: IProps) {
  const [issueView, setData] = useState<string>('default')
  
  const randomIssue = function(): void {
    setData('random')
  }

  const newIssue = function(): void {
    setData('new')
  }

  switch(issueView) {
    case 'random':
      return <RandomIssue />
    case 'new':
      return <NewIssue />
    case 'default':
    default:
      return(
      <Box>
        <Button onClick={randomIssue}>Random</Button>
        <Button onClick={newIssue}>Add new</Button>
      </Box>
      )
  }
}

const mapStateToProps = ({ repos }: IStoreState): { repos: IRepos[] } => {
  return { repos };
};

export default compose(
  connect(
    mapStateToProps,
  )
)(Issues as FunctionComponent);