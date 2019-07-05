from sqlalchemy import Column, Integer, Numeric, String, DateTime, ForeignKey, Boolean
from datetime import datetime
from sqlalchemy.orm import relationship, backref

# base model from sqlalchemy
from base_model import Base
from engine import engine
from session import session

# anytime model is created, it must have 4 properties
# it must inherit from the Base class in sqlalchemy
# it has to have __tablename__ to give it a name in the database
# it has to have one or more columns

class Cookie(Base):
  __tablename__ = 'cookies'

  cookie_id = Column(Integer, primary_key=True)
  cookie_name = Column(String(50), index=True)
  cookie_recipe_url = Column(String(255))
  cookie_sku = Column(String(55))
  quantity = Column(Integer())
  unit_cost = Column(Numeric(12, 2))

  def __repr__(self):
    return '<Cookie {}>'.format(self.cookie_name)



from base_model import Base

class User(Base):
  __tablename__ = 'users'

  user_id = Column(Integer(), primary_key=True)
  username = Column(String(15), nullable=False, unique=True)
  email_address = Column(String(255), nullable=False)
  phone = Column(String(20), nullable=False)
  password = Column(String(25), nullable=False)
  created_on = Column(DateTime(), default=datetime.now)
  updated_on = Column(DateTime(), default=datetime.now)


class Order(Base):
  __tablename__ = 'orders'

  order_id = Column(Integer(), primary_key=True)
  user_id = Column(Integer(), ForeignKey('users.user_id'))
  shipped = Column(Boolean(), default=False)

  user = relationship('User', backref=backref('orders'))


class LineItem(Base):
  __tablename__ = 'line_items'

  line_item_id = Column(Integer(), primary_key=True)
  order_id = Column(Integer(), ForeignKey('orders.order_id'))
  cookie_id = Column(Integer(), ForeignKey('cookies.cookie_id'))
  quantity = Column(Integer())
  extended_cost = Column(Numeric(12, 2))

  order = relationship('Order', backref=backref('line_items'))
  cookie = relationship('Cookie', uselist=False)



# persisting the table using the base model metadata
# metadata is a catalogue of object column information in the table
# also the table schema information
# looks at the base or declarative base for any table found and goes ahead to
# create them
Base.metadata.create_all(engine)

cookiemon = User(
  username='cookiemon',
  email_address='lumex2@cookie.com',
  phone='0806-653-4548',
  password='password'
)

o1 = Order()
o1.user = cookiemon

session.add(o1)

