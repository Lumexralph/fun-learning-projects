from flask import Flask
from flask_migrate import Migrate


# from src import api_v1
from src.config import app_config
from src.models import db, bcrypt

from src.views.home import api_v1
from src.views.UserView import user_api


def create_app(env_name):
  """
  Create the app
  """
  # initialize the app
  app = Flask(__name__)

  app.config.from_object(app_config[env_name])

  app.register_blueprint(api_v1)
  app.register_blueprint(user_api)

  # initialize bcrypt
  bcrypt.init_app(app)

  # initialize the database
  db.init_app(app)

  # # initialize migration scripts
  # Migrate(app, db)


  return app
