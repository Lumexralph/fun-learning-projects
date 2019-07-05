// GET article page
const show = (req, res, next) => {
  if (!req.params.slug) {
    return next(new Error('No article slug.'));
  }
  req.models.Article.findOne({ slug: req.params.slug }, (error, article) => {
    if (error) {
      return next(error);
    }
    if (!article.published && !req.session.admin) {
      return res.send(401);
    }
    res.render('article', article);
  });
};

// GET - all articles used by admin page
const listArticles = (req, res, next) => {
  req.models.Article.list((error, articles) => {
    if (error) {
      return next(error);
    }
    res.send({ articles });
  });
};

// POST article used in admin page,
// add new articles to collection
// send back result with __id of 
// newly created document in database
const add = (req, res, next) => {
  if (!req.body.article) {
    return next(new Error('No article payload'));
  }
  const article = req.body.article;
  article.published = false;
  req.models.Article.create(article, (error, articleResponse) => {
    if (error) {
      return next(error);
    }
    res.send(articleResponse);
  });
};

// PUT - article route used on admin page for publishing
//  used to update article
const edit = (req, res, next) => {
  if (!req.params.id) {
    return next(new Error('No article ID.'));
  }
  req.models.Article
    .findById(req.params.id, (error, article) => {
      if (error) {
        return next(error);
      }
      article.update({ $set: req.body.article }, (error, count, raw) => {
        if (error) {
          return next(error);
        }
        res.send({ affectedCount: count });
      });
    });
};

// DELETE - to remove article by _id used by admin page
const del = (req, res, next) => {
  if (!req.params.id) {
    return next(new Error('No article ID'));
  }
  req.models.Article.findById(req.params.id, (error, article) => {
    if (error) {
      return next(error);
    }
    if (!article) {
      return next(new Error('article not found'));
    }
    article.remove((error, doc) => {
      if (error) {
        return next(error);
      }
      res.send(doc);
    });
  });
};

// GET article post page
const post = (req, res) => {
  if (!req.body.title) {
    res.render('post');
  }
};

// POST - article route from post page form
// construct article object, inject it into database
// render HTML from the post template
const postArticle = (req, res, next) => {
  if (!req.body.title || !req.body.slug || !req.body.text) {
    return res.render('post', { error: 'Fill title, slug and text.' });
  }
  const article = {
    title: req.body.title,
    slug: req.body.slug,
    text: req.body.text,
    published: false
  };

  req.models.Article.create(article, (error, articleResponse) => {
    if (error) {
      return next(error);
    }
    res.render('post', { error: 'Article was added. Publish it on Admin page' });
  });
};

// GET admin page route handler
const admin = (req, res, next) => {
  req.models.Article.list((error, articles) => {
    if (error) {
      return next(error);
    }
    res.render('admin', { articles });
  });
};

export { show, listArticles, add, edit, del, post, postArticle, admin };
