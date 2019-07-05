from sqlalchemy.orm import sessionmaker
from engine import engine


# session wraps the database creation  engine
# provides identity map that connects object to rows in our db
Session = sessionmaker(bind=engine)

session = Session()