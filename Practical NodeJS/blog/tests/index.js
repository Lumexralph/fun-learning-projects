import superagent from 'superagent';
import chai from 'chai';
import { port, boot, shutdown } from '../app';
import seedArticles from '../db/articles.json';

const expect = chai.expect;

describe('server', () => {
  before(() => boot());
});

describe('homepage', () => {
  it('should respond to GET', (done) => {
    superagent
      .get(`http://localhost:${port}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });
    done();
  });

  it('should contain posts', (done) => {
    superagent
      .get(`http://localhost:${port}`)
      .end((err, res) => {
        seedArticles.forEach((item) => {
          if (item.published) {
            expect(res.text).to.contain(`<h2><a href="/articles/${item.slug}">${item.title}`);
          } else {
            expect(res.text).not.to.contain(`<h2><a href="/articles/${item.slug}"${item.title}`);
          }
        });
        done();
      });
  });
});

describe('article page', () => {
  it('should display text', (done) => {
    const n = seedArticles.length;
    seedArticles.forEach((item, index) => {
      superagent
        .get(`http://localhost:${port}/articles/${seedArticles[index].slug}`)
        .end((err, res) => {
          if (item.published) {
            expect(res.text).to.contain(seedArticles[index].text);
          } else {
            expect(res.status).to.be(401);
          }
          if (index + 1 === n) {
            done();
          }
        });
    });
    done();
  });
  after(() => shutdown());
});
