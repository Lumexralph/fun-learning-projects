"""Every model has to inherit from the declarative base
"""

from sqlalchemy.ext.declarative import declarative_base


# A way to connect the model to the database
# use the declarative base and create an instance
# which will create a way to talk to the database
Base = declarative_base()