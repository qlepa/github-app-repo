
import React, { FunctionComponent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, makeStyles, Paper } from '@material-ui/core';
import { IStoreState } from '../reducers';

const selectIssue = (state: IStoreState) => state.issueReducer.issue;
const selectLoadingIssue = (state: IStoreState) => state.issueReducer.loadingIssue;

type IProps = Readonly<{
  goBack: (view: string) => void;
}>

const useStyles = makeStyles(() => ({
  btnRandomGoBack: {
    fontSize: '1.5rem',
    backgroundColor: '#add2ff',
  },
  issueDetails: {
    margin: '10px',
    padding: '5px',
    fontSize: '1.5rem',
  },
  error: {
    color: 'red',
  }
}))

function RandomIssue(props: IProps) {
  const issue = useSelector(selectIssue)
  const loadingIssue = useSelector(selectLoadingIssue)
  
  const handleGoBack = useCallback(
    () => {
      props.goBack?.('default')
    }, [props.goBack]
  )

  const {
    btnRandomGoBack: btnRandomGoBackClass,
    issueDetails: issueDetailsClass,
    error: errorClass,
  } = useStyles(props)

  switch (loadingIssue) {
    case 'succes':
      return (
        <Box>
          <Paper className={issueDetailsClass}>
            <Typography>Your Issue</Typography>
            <Typography>Title: {issue.title}</Typography>
            <Typography>Author: {issue.user.login}</Typography>
            <Typography>Labels: {issue.labels.length > 0 ? issue.labels.map((label) => { return label.name }) : 'No labels'}</Typography>
          </Paper>
          <Button className={btnRandomGoBackClass} onClick={handleGoBack}>Go back</Button>
        </Box>
      )
    case 'fail':
      return <Box><Typography className={errorClass}>FAIL</Typography></Box>
    case 'loading':
    default:
      return <Box><Typography>loading</Typography></Box>
  }
}

export default RandomIssue as FunctionComponent;