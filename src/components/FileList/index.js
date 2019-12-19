import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Fuse from 'fuse.js';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  Checkbox,
  FormControl,
  Grid,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

import { fetchFiles, getDownloadLink, deleteFiles } from '../../actions/files';
import { getCurrentBuildingId } from '../../selectors/router';
import { getFiles } from '../../selectors/files';
import { setMessage } from '../../actions/message';

import Dialog from '../UI/Dialog';
import FileTable from './FileTable';
import { getFileFormat } from '../../helpers';

const useStyles = makeStyles((theme) => ({
  filterControl: {
    width: 160,
  },
  filters: {
    marginBottom: theme.spacing(2),
  },
  root: {
    '@global': {
      '.MuiTableRow-root:empty': {
        display: 'none',
      },
    },
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 32 * 4.5 + 8,
      width: 250,
    },
  },
};

function FileList() {
  const s = useStyles();
  const dispatch = useDispatch();
  const files = useSelector(getFiles);
  const currentBuildingId = useSelector(getCurrentBuildingId);
  const fuse = useRef();

  const [deleteConfirmOpened, setDeleteConfirmOpened] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    types: [],
  });

  const downloadFile = (fileId) => {
    dispatch(getDownloadLink(fileId)).then((url) => {
      window.location.href = url;
    })
      .catch((err) => {
        dispatch(setMessage('Unable to download file.'));
        console.error(err);
      });
  };

  const onDeleteFiles = (list) => () => {
    const ids = list || selectedItems.map((item) => item.id);
    setDeleteList(ids);
    setDeleteConfirmOpened(true);
  };

  // FIXME: Remove deleted ids from selectedItems
  const doDeleteFiles = () => {
    dispatch(deleteFiles(deleteList));
    dispatch(setMessage(`File${deleteList.length > 1 ? 's have' : ' has'} been deleted.`));
    setDeleteConfirmOpened(false);
  };

  const onSelectionChange = useCallback((array) => {
    setSelectedItems(array);
  }, []);

  useEffect(() => {
    if (currentBuildingId) {
      dispatch(fetchFiles(currentBuildingId));
    }
  }, [currentBuildingId, dispatch]);

  useEffect(() => {
    let data = files;

    if (filters.name) {
      data = fuse.current.search(filters.name);
    }
    if (filters.types && filters.types.length) {
      data = data.filter((item) => filters.types.includes(getFileFormat(item.name)));
    }

    setTableData(data);
  }, [files, filters]);

  useEffect(() => {
    const options = {
      keys: ['name'],
    };

    fuse.current = new Fuse(files, options);

    const types = files.reduce((acc, curr) => {
      const type = getFileFormat(curr.name);
      return acc.includes(type)
        ? acc
        : [...acc, type];
    }, []);
    setFileTypes(types);
  }, [files]);

  const onFilterChange = useCallback((filter) => (e) => {
    setFilters({
      ...filters,
      [filter]: e.target.value,
    });
  }, [filters]);

  const onArrayFilterChange = useCallback((filter) => (e) => {
    const { value } = e.target;
    const filterValue = filters[filter];
    if (filters[filter].includes(value)) {
      const index = filterValue.indexOf(value);
      filterValue.splice(index, 1);
    } else {
      filterValue.push(value);
    }

    setFilters({
      ...filters,
      [filter]: e.target.value,
    });
  }, [filters]);

  return (
    <div className={s.root}>
      <Grid
        className={s.filters}
        container
        spacing={2}
      >
        <Grid item>
          <TextField
            className={s.filterControl}
            label="Name"
            onChange={onFilterChange('name')}
            size="small"
            value={filters.name}
          />
        </Grid>
        <Grid item>
          <FormControl className={s.filterControl} size="small">
            <InputLabel id="filter-types-label">File type</InputLabel>
            <Select
              input={<Input />}
              labelId="filter-types-label"
              MenuProps={MenuProps}
              multiple
              onChange={onArrayFilterChange('types')}
              renderValue={(selected) => selected.join(', ')}
              value={filters.types}
            >
              {fileTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={filters.types.includes(type)} size="small" />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Dialog
        content={(
          <p>
            {'Deleting files will put them in Trash for 30 days. After this time, you won\'t be able to preview or download them.'}
          </p>
        )}
        okText="Yes, delete"
        onCancel={() => setDeleteConfirmOpened(false)}
        onOk={doDeleteFiles}
        open={deleteConfirmOpened}
        title="Are you sure?"
      />
      <FileTable
        data={tableData}
        onDeleteFiles={onDeleteFiles}
        onDownloadFile={downloadFile}
        onSelectionChange={onSelectionChange}
        selectedItems={selectedItems}
      />
    </div>
  );
}

export default FileList;
