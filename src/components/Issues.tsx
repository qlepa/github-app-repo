import React, { useState, FunctionComponent } from 'react';
// import { connect } from 'react-redux';
import compose from 'recompose/compose'
import { Box, Button } from '@material-ui/core';
import RandomIssue from './RandomIssue';
import NewIssue from './NewIssue';

function Issues() {
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
      return(
      <Box>
        <Button onClick={randomIssue}>Random</Button>
        <Button onClick={newIssue}>Add new</Button>
      </Box>
      )
  }
}

export default compose()(Issues as FunctionComponent);