import { setAuthorizationInHeader } from '../../helpers/apiCall';


describe('Test for API to set token in header', () => {
  it('Should have an Authorization field in header with token', (done) => {
    const result = setAuthorizationInHeader('1235');
    const header = {
      Accept: 'application/json, text/plain, */*',
      Authorization: '1235',
    };

    expect(result).toMatchObject(header);
    done();
  });

  it('Should not have an Authorization field with token in header', (done) => {
    const result = setAuthorizationInHeader();
    const header = { Accept: 'application/json, text/plain, */*' };

    expect(result).toMatchObject(header);
    done();
  });
});
