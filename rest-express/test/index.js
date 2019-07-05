const superagent = require('superagent');
const expect = require('expect.js');

describe('express rest api server', () => {
   var id = 0;

   it('does not create object with incomplete data', (done) => {
    superagent.post('http://localhost:8000/collections/test')
      .send({
        name: '',
        email: 'olumide@yahoo.com'
      })
      .end((error, res) => {
        expect(error).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(typeof res.body.msg).to.eql('string');
        expect(res.body.msg).to.eql('Incomplete data, name and email');
        done();
      });

  });

  it('post object', (done) => {
    // send request to local instance of the server 
    superagent.post('http://localhost:8000/collections/test')
              .send({
                name: 'Lumex',
                email: 'olumideralph@gmail.com'
              })
              .end((error, res) => {
                res.body = res.body.ops;
                expect(error).to.eql(null);
                expect(res.body.length).to.eql(1);
                expect(res.body[0]._id.length).to.eql(24);
                id = res.body[0]._id;
                done();
              })
  });

  it('retrieves an object', (done) => {
    superagent.get(`http://localhost:8000/collections/test/${id}`)
    .end((error, res) => {
      expect(error).to.eql(null);
      expect(typeof res.body).to.eql('object')
      expect(res.body._id.length).to.eql(24);
      expect(res.body._id).to.eql(id);
      done();
    })
  })

  it('does not retrieve an object', (done) => {
    superagent.get(`http://localhost:8000/collections/test/${id}dd`)
    .end((error, res) => {
      expect(error).to.eql(null);
      expect(typeof res.body).to.eql('object')
      expect(res.body.msg).to.eql('data cannot be found');
      done();
    })
  })

  it('retrieves a collection', (done) => {
    superagent.get('http://localhost:8000/collections/test')
    .end((error, res) => {
      expect(error).to.eql(null);
      expect(res.body.length).to.be.above(0);
      expect(res.body.map(item => item._id)).to.contain(id);
      done();
    })
  })

  it('updates an object', (done) => {
    superagent.put(`http://localhost:8000/collections/test/${id}`)
    .send({
      name: 'Adenike',
      email: 'adenikeopatade@gmail.com'
    })
    .end((error, res) => {
      expect(error).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(res.body.msg).to.eql('success');
      done();
    })
  })

  it('does not update with same data', (done) => {
    superagent.put(`http://localhost:8000/collections/test/${id}`)
    .send({
      name: 'Adenike',
      email: 'adenikeopatade@gmail.com'
    })
    .end((error, res) => {
      expect(error).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(res.body.msg).to.eql('data already up-to-date');
      done();
    })
  })

  it('cannot update data', (done) => {
    superagent.put(`http://localhost:8000/collections/test/${id}s`)
    .send({
      name: 'Adenike',
      email: 'adenikeopatade@gmail.com'
    })
    .end((error, res) => {
      expect(error).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(res.body.msg).to.eql('error');
      done();
    })
  })


  it('checks object is updated', (done) => {
    superagent.get(`http://localhost:8000/collections/test/${id}`)
    .end((error, res) => {
      expect(error).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(res.body._id.length).to.eql(24);
      expect(res.body._id).to.eql(id);
      expect(res.body.name).to.eql('Adenike');
      done();
    })
  })

  it('removes an object', (done) => {
    superagent.del(`http://localhost:8000/collections/test/${id}`)
    .end((error, res) => {
         //res.body = res.body.ops;
      expect(error).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(res.body.msg).to.eql('success');
      done();
    })
  });

  it('does not remove an object', (done) => {
    superagent.del(`http://localhost:8000/collections/test/${id}s`)
    .end((error, res) => {
         //res.body = res.body.ops;
      expect(error).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(res.body.msg).to.eql('data not found to be removed');
      done();
    })
  });

 })