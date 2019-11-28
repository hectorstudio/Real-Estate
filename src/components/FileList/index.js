import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import { fetchFiles, getDownloadLink } from '../../actions/files';
import { getFileFormat } from '../../helpers';
import { getFiles } from '../../selectors/files';
import { getUsers } from '../../selectors/users';
import { setMessage } from '../../actions/message';

import Link from '../UI/Link';

import s from './index.module.scss';

function FileList() {
  const dispatch = useDispatch();
  const files = useSelector(getFiles);
  const users = useSelector(getUsers);

  const columns = [
    {
      render: (rowData) => (
        <Link
          to="/"
          variant="body1"
        >
          {`${rowData.name}`}
        </Link>
      ),
      title: 'File name',
    },
    {
      render: (rowData) => getFileFormat(rowData.name),
      title: 'File type',
    },
    {
      field: 'addDate',
      title: 'Date uploaded',
    },
    {
      field: 'modifyDate',
      title: 'Date modified',
    },
    {
      // field: 'addUser',
      render: (rowData) => {
        const { addUserId } = rowData;
        const user = users.find((x) => x.id === addUserId);

        if (!user) return null;

        return (
          <Link
            to="/"
            variant="body1"
          >
            {`${user.firstName} ${user.lastName}`}
          </Link>
        );
      },
      title: 'Uploaded by',
    },
    {
      field: 'modifyUser',
      title: 'Modified by',
    },
  ];

  const downloadFile = (fileId) => {
    dispatch(getDownloadLink(fileId)).then((url) => {
      window.open(url);
    })
      .catch((err) => {
        dispatch(setMessage('Unable to download file.'));
        console.error(err);
      });
  };

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  return (
    <div className={s.root}>
      <MaterialTable
        actions={[
          {
            icon: 'edit',
            onClick: () => {},
            tooltip: 'Edit',
          },
          {
            icon: 'get_app',
            onClick: (e, rowData) => downloadFile(rowData.id),
            tooltip: 'Download',
          },
          {
            icon: 'delete',
            onClick: () => { },
            tooltip: 'Delete',
          },
        ]}
        columns={columns}
        components={{
          Container: Grid,
        }}
        data={files}
        options={{
          actionsColumnIndex: -1,
          search: false,
          showTitle: false,
          toolbar: false,
        }}
      />
    </div>
  );
}

export default FileList;
