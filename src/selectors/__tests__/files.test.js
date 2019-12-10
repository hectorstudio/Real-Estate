import { FILE_STATUS } from '../../constants';
import { getFiles, getFileById, getUploadingFiles } from '../files';

let state;
beforeEach(() => {
  state = {
    files: {
      entities: {
        files: {
          1: {
            id: '1',
            name: 'foo',
            status: FILE_STATUS.READY,
          },
          2: {
            id: '2',
            name: 'bar',
            status: FILE_STATUS.UPLOADING,
          },
        },
      },
      result: ['1', '2'],
    },
  };
});

describe('getFiles', () => {
  it('returns list of files', () => {
    const selection = getFiles(state);

    expect(selection).toMatchObject([
      state.files.entities.files[1],
      state.files.entities.files[2],
    ]);
  });
});

describe('getFileById', () => {
  it('returns a file by id', () => {
    const selection = getFileById(state, '1');

    expect(selection).toMatchObject(state.files.entities.files[1]);
  });
});

describe('getUploadingFiles', () => {
  it('returns files with status UPLOADING', () => {
    const selection = getUploadingFiles(state);

    expect(selection).toMatchObject([
      state.files.entities.files[2],
    ]);
  });
});
