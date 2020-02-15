import React, { FunctionComponent, useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@material-ui/core';

interface IProps {
  repoName: string;
  openIssues: number;
}
interface IIssue {

}

function RandomIssue(props: IProps) {
  const [issue, setData] = useState<IIssue>({})

  useEffect(() => {
    const issueNumber = Math.round(Math.random()*props.openIssues)
    const url = `http://api.github.com/repos/qlepaplayground/${props.repoName}/issues/${issueNumber}`
    
    axios.get(url)
      .then(res => {
        console.log(res)
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return(
    <Box>
      <Typography>Your Issue</Typography>
      <Typography>Title: </Typography>
      <Typography>Description: </Typography>
      <Button>Back</Button>
    </Box>
  )
}

export default RandomIssue as FunctionComponent;