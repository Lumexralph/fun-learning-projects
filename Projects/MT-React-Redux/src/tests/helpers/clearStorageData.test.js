import clearStorageData from '../../helpers/clearStorageData';
import updateStorageData from '../../helpers/updateStorageData';
import getDataFromStorage from '../../helpers/getDataFromStorage';

describe('Test for localStorage helper functions', () => {
  it('Should add a token to the local storage', (done) => {
    const result = updateStorageData('token', '12345');
    expect(result).toBeUndefined();
    done();
  });

  it('Should retrieve a token from the local storage', (done) => {
    const result = getDataFromStorage('token');
    expect(result).toBe('12345');
    done();
  });

  it('Should clear the localStorage', (done) => {
    const result = clearStorageData();
    expect(result).toBeUndefined();
    done();
  });
});
