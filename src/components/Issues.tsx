import React, { useState, FunctionComponent } from 'react';
import { Box, Button } from '@material-ui/core';
import RandomIssue from './RandomIssue';
import NewIssue from './NewIssue';
import { connect } from 'react-redux';
import { IStoreState } from '../reducers';

interface IProps {
  choosedRepo: number;
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
      const disabled = props.choosedRepo === 0 ? true : false
      return(
      <Box>
        <Button disabled={disabled} onClick={randomIssue}>Random</Button>
        <Button disabled={disabled} onClick={newIssue}>Add new</Button>
      </Box>
      )
  }
}

const mapStateToProps = (state: IStoreState): { choosedRepo: number, } => {
  return { choosedRepo: state.reposReducer.choosedRepo, }
};

export default connect(
    mapStateToProps,
  )(Issues as FunctionComponent);