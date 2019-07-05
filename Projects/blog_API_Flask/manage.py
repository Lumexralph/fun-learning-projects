from pathlib import Path
from os import getenv
from dotenv import load_dotenv

from run import manager

from main import create_app

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path, verbose=True)

# get the environment the app is running
app_env = getenv('FLASK_ENV', default='production')

# create app with the passed environment configuration
app = create_app(app_env)


@app.route('/')
def index():
  return 'Welcome to the home of the blog', 200


if __name__ == '__main__':
  app.run()
