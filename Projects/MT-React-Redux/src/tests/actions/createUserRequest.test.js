import createUserRequest from '../../actions/createUserRequest';


describe('Test for admin action', () => {
  it('Should approve a request', () => {
    const request = {
      title: 'Game of life',
      content: 'Game of the year',
      department: 'Repairs',
    };

    expect(createUserRequest(request)().resolves).toBeUndefined();
  });
});
