import React, { useCallback, useState } from 'react';
import MaterialTable from 'material-table';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import { getBuildings } from '../../../selectors/buildings';
import { ROUTES } from '../../../constants';

import Link from '../../UI/Link';

import s from './index.module.scss';

function BuildingList() {
  const buildings = useSelector(getBuildings);
  // eslint-disable-next-line no-unused-vars
  const [selectedItems, setSelectedItems] = useState([]);

  const columns = [
    {
      render: (rowData) => (
        <Link
          to={ROUTES.building(rowData.id)}
          variant="body1"
        >
          {`${rowData.name}`}
        </Link>
      ),
      title: 'Name',
    },
    {
      field: 'address',
      title: 'Address',
    },
    {
      field: 'city',
      title: 'City',
    },
    {
      render: (rowData) => new Date(rowData.addDate).toLocaleDateString('default', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      title: 'Date added',
    },
  ];

  const onSelectionChange = useCallback((array) => {
    setSelectedItems(array);
  }, []);

  return (
    <div className={s.root}>
      <MaterialTable
        columns={columns}
        components={{
          Container: Grid,
        }}
        data={buildings}
        onSelectionChange={onSelectionChange}
        options={{
          actionsColumnIndex: 0,
          draggable: false,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50, 100],
          selection: true,
          toolbar: false,
        }}
      />
    </div>
  );
}

export default BuildingList;
