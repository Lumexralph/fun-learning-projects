# Install sqlalchemy
# connect to the database and create your session

from sqlalchemy import create_engine

# the api to connect to the database
# please note, you need psycopg2, a driver or adapter
# API to connect to postgresql db in a python application
engine = create_engine('postgresql+psycopg2://postgres:password@localhost:5432/sql_learning')

# when this connection is done, we create a session
