import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Message, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import HeaderComponent from '../components/Header/HeaderComponent';
import HeaderCard from '../components/HeaderCard';
import Button from '../components/Button';
import Menubar from '../components/Menubar';
import Footer from '../components/Footer';
import FooterSlim from '../components/FooterSlim';
import Card from '../components/Card';
import { AuthorsHavenDetails } from '../tests/__mocks__/mockData';
import getArticle from '../redux/actions/getArticle';

export class Home extends Component {
  state = {
    verticalCard: (window.screen.width < 769) ? '' : 'vertical-card',
    horizontalPlain: (window.screen.width < 769) ? '' : 'horizontal-plain',
    sizeZero: (window.screen.width < 769) ? 1 : '',
    sizeThree: (window.screen.width < 769) ? 1 : 3,
    tabletWidth: (window.screen.width < 769) ? 8 : 5,
  };

  componentDidMount() {
    const { loadArticle } = this.props;
    const articlesRequest = {
      url: 'https://fargo-ah-staging.herokuapp.com/api/articles',
      type: 'articles',
    };
    const categoryRequest = {
      url: 'https://fargo-ah-staging.herokuapp.com/api/articles/list/categories',
      type: 'category',
    };

    loadArticle(articlesRequest);
    loadArticle(categoryRequest);
    window.addEventListener('resize', this.updateCards);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCards);
  }

  updateCards = () => {
    this.setState((window.screen.width < 769 || window.innerWidth < 769)
      ? {
        verticalCard: '',
        horizontalPlain: '',
        sizeZero: 1,
        sizeThree: 1,
        tabletWidth: 8,
      }
      : {
        verticalCard: 'vertical-card',
        horizontalPlain: 'horizontal-plain',
        sizeZero: 0,
        sizeThree: 3,
        tabletWidth: 5,
      });
  }

  render() {
    const {
      location,
      currentUser,
      loadedArticles,
      loadedCategories,
      history,
    } = this.props;
    const {
      verticalCard,
      horizontalPlain,
      sizeZero,
      sizeThree,
      tabletWidth,
    } = this.state;
    return (
      <div>
        <header className="header-bar">
          <HeaderComponent
            history={history}
            text={AuthorsHavenDetails.text}
            user={currentUser}
            pathname={location.pathname}
          />
        </header>
        <Menubar categorieslist={loadedCategories} />
        <div className="header-image-card">
          <Grid id="header-card" stackable>
            <HeaderCard
              articles={loadedArticles.slice(0, 3)}
              tabletWidth={tabletWidth}
            />
          </Grid>
        </div>
        {!currentUser ? (
          <section className="homepage-welcome-container">
            <div>
              <Grid.Row>
                <Grid.Column>
                  <Message>
                    <Header as="h2">Author’s Haven</Header>
                    <p>
                      A community of like minded authors to foster inspiration
                      and innovation by leveraging the modern web.
                    </p>
                    <div>
                      <Link to="/write">
                        <Button floated="right" text={AuthorsHavenDetails.storyText} />
                      </Link>
                    </div>
                  </Message>
                </Grid.Column>
              </Grid.Row>
            </div>
          </section>) : null
        }
        <section className="homepage-container" stackable>
          <section className="featured-top-paid">
            <div className="featured">
              <h1 className="sub-heading">
                Featured
                <hr className="ruler" />
              </h1>
              <Card
                classStyle={verticalCard}
                articles={loadedArticles.slice(0, 2)}
                size={sizeZero}
              />
            </div>
            <div className="top-paid">
              <h1 className="sub-heading">
                Top paid
                <hr />
              </h1>
              <Card articles={loadedArticles.slice(0, 2)} size={1} />
            </div>
          </section>
          <section className="trending">
            <h1 className="sub-heading">
              What&apos;s Trending
              <hr className="ruler" />
            </h1>
            <Card
              classStyle={horizontalPlain}
              articles={loadedArticles.slice(0, 6)}
              size={sizeThree}
            />
            <Link to="/">
              <Button
                className="more-button"
                text="more >"
              />
            </Link>
          </section>
        </section>
        <footer>
          <div className="top-footer">
            <Footer />
            <FooterSlim />
          </div>
        </footer>
      </div>
    );
  }
}

Home.defaultProps = {
  location: {},
  currentUser: {},
};

Home.propTypes = {
  location: PropTypes.shape(),
  currentUser: PropTypes.shape(),
  loadArticle: PropTypes.func.isRequired,
  loadedArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ currentUser, loadedArticles, loadedCategories }) => ({
  currentUser,
  loadedArticles,
  loadedCategories,
});


export const mapDispatchToProps = dispatch => ({
  loadArticle: asyncData => dispatch(getArticle(asyncData)),
});

const ConnectedHomepage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default ConnectedHomepage;
