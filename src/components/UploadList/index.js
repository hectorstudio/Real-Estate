import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  List,
  Typography,
} from '@material-ui/core';

import { getUploadingFiles } from '../../selectors/files';
import { getUploads } from '../../selectors/uploads';
import { getGcsLocalStorageItemKey } from '../../helpers';

import UploadItem from './UploadItem';

import s from './index.module.scss';

function UploadList() {
  const uploads = useSelector(getUploads);
  const uploadingFiles = useSelector(getUploadingFiles);
  const [filesToReupload, setFilesToReupload] = useState([]);

  useEffect(() => {
    if (!uploadingFiles.length) {
      setFilesToReupload([]);
      return;
    }

    const filesToReuploadTemp = [];
    uploadingFiles.forEach((file) => {
      if (uploads.find((up) => up.id === file.id)) return;

      const key = getGcsLocalStorageItemKey(file.id);
      const storageItem = window.localStorage.getItem(key);
      if (storageItem) {
        filesToReuploadTemp.push(file);
      }
    });

    setFilesToReupload(filesToReuploadTemp);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadingFiles, uploads.length]);

  if (!uploads.length && !filesToReupload.length) {
    return null;
  }

  return (
    <Card className={s.root} raised>
      <CardContent className={s.rootContent}>
        <Typography component="h6" variant="h6">
          Uploads
        </Typography>
        <List className={s.uploadList}>
          {filesToReupload.map((obj) => <UploadItem key={obj.id} reupload upload={obj} />)}
          {uploads.map((obj) => <UploadItem key={obj.id} upload={obj} />)}
        </List>
      </CardContent>
    </Card>
  );
}

export default UploadList;
