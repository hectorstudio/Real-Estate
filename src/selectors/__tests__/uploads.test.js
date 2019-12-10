import { getUploads, getUploadById } from '../uploads';

let state;
beforeEach(() => {
  state = {
    uploads: {
      entities: {
        uploads: {
          1: { id: '1', name: 'foo' },
          2: { id: '2', name: 'bar' },
        },
      },
      result: ['1', '2'],
    },
  };
});

describe('getUploads', () => {
  it('returns list of uploads', () => {
    const selection = getUploads(state);

    expect(selection).toMatchObject([
      state.uploads.entities.uploads[1],
      state.uploads.entities.uploads[2],
    ]);
  });
});

describe('getUploadById', () => {
  it('returns upload by id', () => {
    const selection = getUploadById(state, '1');

    expect(selection).toMatchObject(state.uploads.entities.uploads[1]);
  });
});
