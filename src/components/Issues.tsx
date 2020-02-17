import React, { useState, FunctionComponent } from 'react';
import { Box, Button } from '@material-ui/core';
import RandomIssue from './RandomIssue';
import NewIssue from './NewIssue';
import { useSelector } from 'react-redux';
import { IStoreState } from '../reducers';

interface IProps {
  selectedRepo: number;
}

function Issues(props: IProps) {
  const [issueView, setData] = useState<string>('default')
  const selectedRepo = useSelector((state: IStoreState) => state.reposReducer.selectedRepo)
  
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
      const disabled = selectedRepo === 0 ? true : false

      return(
      <Box>
        <Button disabled={disabled} onClick={randomIssue}>Random</Button>
        <Button disabled={disabled} onClick={newIssue}>Add new</Button>
      </Box>
      )
  }
}

export default Issues as FunctionComponent;