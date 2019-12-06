import React, { useEffect, useCallback, useState } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import fileSize from 'filesize';
import { Grid, Button } from '@material-ui/core';

import { fetchFiles, getDownloadLink, deleteFiles } from '../../actions/files';
import { getFileFormat } from '../../helpers';
import { getFiles } from '../../selectors/files';
import { getUsers } from '../../selectors/users';
import { setMessage } from '../../actions/message';
import { getCurrentBuildingId } from '../../selectors/router';

import Link from '../UI/Link';

import s from './index.module.scss';

function FileList() {
  const dispatch = useDispatch();
  const files = useSelector(getFiles);
  const users = useSelector(getUsers);
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const [selectedItems, setSelectedItems] = useState([]);

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
      render: (rowData) => fileSize(rowData.size || 0),
      title: 'File size',
    },
    // {
    //   render: (rowData) => rowData.status,
    //   title: 'Status',
    // },
    {
      render: (rowData) => new Date(rowData.addDate).toLocaleDateString('default', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      title: 'Date uploaded',
    },
    {
      field: 'modifyDate',
      title: 'Date modified',
    },
    {
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
      window.location.href = url;
    })
      .catch((err) => {
        dispatch(setMessage('Unable to download file.'));
        console.error(err);
      });
  };

  const onDeleteFile = (fileId) => {
    dispatch(deleteFiles([fileId])).then(() => {
      dispatch(setMessage('File has been deleted.'));
    });
  };

  const onSelectionChange = useCallback((array) => {
    setSelectedItems(array);
  }, []);

  const onDeleteFiles = () => {
    const ids = selectedItems.map((item) => item.id);
    dispatch(deleteFiles(ids));
  };

  useEffect(() => {
    if (currentBuildingId) {
      dispatch(fetchFiles(currentBuildingId));
    }
  }, [currentBuildingId, dispatch]);

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
            onClick: (e, rowData) => onDeleteFile(rowData.id),
            tooltip: 'Delete',
          },
        ]}
        columns={columns}
        components={{
          Container: Grid,
          Toolbar: () => (
            <Grid className={s.tableToolbar} container>
              <Grid item>
                <Button
                  disabled={!selectedItems.length}
                  onClick={onDeleteFiles}
                  variant="outlined"
                >
                  Delete selected
                </Button>
              </Grid>
            </Grid>
          ),
        }}
        data={files}
        onSelectionChange={onSelectionChange}
        options={{
          actionsColumnIndex: 0,
          draggable: false,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50, 100],
          selection: true,
        }}
      />
    </div>
  );
}

export default FileList;
