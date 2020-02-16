import React, { useState, FunctionComponent } from 'react';
import { Box, Button } from '@material-ui/core';
import RandomIssue from './RandomIssue';
import NewIssue from './NewIssue';
import { connect } from 'react-redux';
import { IStoreState } from '../reducers';

interface IProps {
  selectedRepo: number;
}

function Issues(props: IProps) {
  const [issueView, setData] = useState<string>('default')
  
  const randomIssue = (): void => {
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
      const disabled = props.selectedRepo === 0 ? true : false
      return(
      <Box>
        <Button disabled={disabled} onClick={randomIssue}>Random</Button>
        <Button disabled={disabled} onClick={newIssue}>Add new</Button>
      </Box>
      )
  }
}

const mapStateToProps = (state: IStoreState): { selectedRepo: number, } => {
  return { selectedRepo: state.reposReducer.selectedRepo, }
};

export default connect(
    mapStateToProps,
  )(Issues as FunctionComponent);