import editUserRequest from '../../actions/editUserRequest';

describe('Test for edit user request action', () => {
  it('Should edit a request', () => {
    const request = {
      title: 'Game of life',
      content: 'Game of the year',
      department: 'Repairs',
    };
    expect(editUserRequest(1, request)().resolves).toBeUndefined();
  });
});
