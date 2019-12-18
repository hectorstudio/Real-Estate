// FIXME: Eslint shows en error while all props are used
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import fileSize from 'filesize';
import { Delete, GetApp } from '@material-ui/icons';
import { Grid, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import { ROLES } from '../../../constants';
import { getBuildingPermissionByBuildingIdAndUserId } from '../../../selectors/buildings';
import { getCurrentBuildingId } from '../../../selectors/router';
import { getCurrentUser } from '../../../selectors/user';
import { getFileFormat } from '../../../helpers';
import { getUsers } from '../../../selectors/users';

import Link from '../../UI/Link';

const useStyles = makeStyles((theme) => ({
  tableToolbar: {
    marginBottom: theme.spacing(3),
  },
}));

function FileTable(props) {
  const s = useStyles();
  const users = useSelector(getUsers);
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const currentUser = useSelector(getCurrentUser);
  const permission = useSelector((state) => getBuildingPermissionByBuildingIdAndUserId(state, currentBuildingId, currentUser.id)) || {};

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
    {
      render: (rowData) => new Date(rowData.addDate).toLocaleDateString('default', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      title: 'Date uploaded',
    },
    // {
    //   field: 'modifyDate',
    //   title: 'Date modified',
    // },
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
    // {
    //   field: 'modifyUser',
    //   title: 'Modified by',
    // },
    {
      render: (rowData) => (
        <Grid container>
          <Grid item>
            <IconButton onClick={() => props.onDownloadFile(rowData.id)} size="small">
              <GetApp />
            </IconButton>
          </Grid>
          {[ROLES.EDITOR, ROLES.ADMIN].includes(permission.role) && (
            <Grid item>
              <IconButton onClick={props.onDeleteFiles([rowData.id])} size="small">
                <Delete />
              </IconButton>
            </Grid>
          )}
        </Grid>
      ),
      title: 'Actions',
    },
  ];

  return (
    <MaterialTable
      columns={columns}
      components={{
        Container: Grid,
        Toolbar: () => (
          <Grid className={s.tableToolbar} container>
            <Grid item>
              <Button
                disabled={!props.selectedItems.length}
                onClick={props.onDeleteFiles()}
                variant="outlined"
              >
                Delete selected
              </Button>
            </Grid>
          </Grid>
        ),
      }}
      data={props.data}
      onSelectionChange={props.onSelectionChange}
      options={{
        draggable: false,
        pageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
        selection: true,
      }}
    />
  );
}

FileTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onDeleteFiles: PropTypes.func.isRequired,
  onDownloadFile: PropTypes.func.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string),
};

FileTable.defaultProps = {
  selectedItems: [],
};

export default FileTable;
