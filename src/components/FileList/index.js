import React, { useEffect, useCallback, useState } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';

import { fetchFiles, getDownloadLink, deleteFile } from '../../actions/files';
import { getFileFormat } from '../../helpers';
import { getFiles } from '../../selectors/files';
import { getUsers } from '../../selectors/users';
import { setMessage } from '../../actions/message';

import Link from '../UI/Link';
import Details from './Details';

import s from './index.module.scss';

function FileList() {
  const dispatch = useDispatch();
  const files = useSelector(getFiles);
  const users = useSelector(getUsers);
  const [tableReady, setTableReady] = useState(false);

  const tableRef = useCallback((table) => {
    if (!table) return;

    // return
    (function updateTableState() {
      if (!table.state.data.length && files.length) {
        setTimeout(updateTableState, 50);
        return;
      }

      table.state.data.forEach((row, i) => {
        // Toggle only rows that have hidden details panel
        if (row && !row.tableData.showDetailPanel) {
          table.onToggleDetailPanel([i], (rowData) => <Details data={rowData} />);
        }

        if (!tableReady && i === table.state.data.length - 1) {
          setTableReady(true);
        }
      });
    }());
  }, [files.length, tableReady]);

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
      render: (rowData) => rowData.status,
      title: 'Status',
    },
    {
      render: (rowData) => getFileFormat(rowData.name),
      title: 'File type',
    },
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
    dispatch(deleteFile(fileId)).then(() => {
      dispatch(setMessage('File has been deleted.'));
    });
  };

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  return (
    <div className={clsx(s.root, tableReady && s.tableWithDetails)}>
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
        }}
        data={files}
        detailPanel={[{
          icon: () => null,
          render: () => null,
        }]}
        isLoading={!tableReady}
        options={{
          actionsColumnIndex: -1,
          draggable: false,
          search: false,
          showTitle: false,
          toolbar: false,
        }}
        tableRef={tableRef}
      />
    </div>
  );
}

export default FileList;
