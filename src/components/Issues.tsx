import React, { useState, FunctionComponent } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import RandomIssue from './RandomIssue';
import NewIssue from './NewIssue';
import { useSelector } from 'react-redux';
import { IStoreState } from '../reducers';

const selectSelectedRepo = (state: IStoreState) => state.reposReducer.selectedRepo;

type IProps = {}

const useStyles = makeStyles(() => ({
  btnRandom: {
    fontSize: '1.5rem',
  },
  btnNewIssue: {
    fontSize: '1.5rem',
  },
}))

function Issues(props: IProps) {
  const [issueView, setData] = useState<string>('default');
  const selectedRepo = useSelector(selectSelectedRepo);
  
  const randomIssue = (): void => {
    setData('random')
  }

  const newIssue = function(): void {
    setData('new')
  }

  const {
    btnRandom: btnRandomClass,
    btnNewIssue: btnNewIssueClass,
  } = useStyles(props)

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
        <Button className={btnRandomClass} disabled={disabled} onClick={randomIssue}>Random</Button>
        <Button className={btnNewIssueClass} disabled={disabled} onClick={newIssue}>Add new</Button>
      </Box>
      )
  }
}

export default Issues as FunctionComponent;