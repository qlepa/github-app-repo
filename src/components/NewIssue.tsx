import React, { FunctionComponent } from 'react';
import { Box, Typography } from '@material-ui/core';

interface IProps {
  
}

function NewIssue(props: IProps) {
  return(
    <Box>
      <Typography>Add new issue</Typography>
      <Typography>Title: </Typography>
      <Typography>Description: </Typography>
    </Box>
  )
}

export default NewIssue as FunctionComponent;