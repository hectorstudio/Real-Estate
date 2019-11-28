import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import { fetchFiles } from '../../actions/files';

import s from './index.module.scss';
import { getFiles } from '../../selectors/files';

const columns = [
  {
    field: 'name',
    title: 'File name',
  },
  {
    render: (rowData) => '.pdf',
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
    field: 'addUser',
    title: 'Uploaded by',
  },
  {
    field: 'modifyUser',
    title: 'Modified by',
  },
];

function FileList() {
  const dispatch = useDispatch();
  const files = useSelector(getFiles);

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
