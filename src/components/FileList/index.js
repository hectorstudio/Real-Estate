import React from 'react';
import MaterialTable from 'material-table';
import { Grid } from '@material-ui/core';

import s from './index.module.scss';

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

const data = [
  {
    addDate: new Date(2017, 12, 28).toDateString(),
    addUser: 'Damian Bartosik',
    modifyDate: new Date().toDateString(),
    modifyUser: 'John Doe',
    name: 'Floor_plan.pdf',
    path: 'Floor_plan.pdf',
  },
  {
    addDate: new Date(2018, 4, 12).toDateString(),
    addUser: 'Mike Tyson',
    modifyDate: new Date(2019, 11, 4).toDateString(),
    modifyUser: 'Jon Jones',
    name: 'Second_Floor.pdf',
    path: 'Floor_plan.pdf',
  },
];

function FileList() {
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
        data={data}
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
