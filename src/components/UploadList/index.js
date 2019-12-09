import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  List,
  Typography,
} from '@material-ui/core';

import { getUploads } from '../../selectors/uploads';

import s from './index.module.scss';
import UploadItem from './UploadItem';

function UploadList() {
  const uploads = useSelector(getUploads);

  if (!uploads.length) {
    return null;
  }

  return (
    <Card className={s.root} raised>
      <CardContent className={s.rootContent}>
        <Typography component="h6" variant="h6">
          Uploads
        </Typography>
        <List className={s.uploadList}>
          {uploads.map((obj) => <UploadItem key={obj.id} upload={obj} />)}
        </List>
      </CardContent>
    </Card>
  );
}

export default UploadList;
