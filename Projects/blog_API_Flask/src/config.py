from os import getenv, environ
from pathlib import Path  # python3 only

from dotenv import load_dotenv

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path, verbose=True)


class Config(object):
  """
  Configuration common to all environment
  """

  TESTING = False
  SQLALCHEMY_DATABASE_URI = getenv('DATABASE_URL', default='postgresql://localhost/blog_flask_db')
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  JWT_SECRET_KEY = getenv('JWT_SECRET_KEY')


# using class inheritance to set production and development config
class Development(Config):
  """
  Configuration for development
  """

  DEBUG = True


class Production(Config):
  """
  Configuration for production
  """

  pass



app_config = {
  'development': Development,
  'production': Production,
}