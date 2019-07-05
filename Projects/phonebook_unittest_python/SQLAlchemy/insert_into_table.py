# to insert data into the db, we will create an instance 
# of the model

from Cookie import Cookie

cc_cookie = Cookie(
  cookie_name='chocolate chip',
  cookie_recipe_url='http://lumexralph.com',
  cookie_sku='CC01',
  quantity=12,
  unit_cost=0.50
)

cc_cookie_2 = Cookie(
  cookie_name='Milk chip',
  cookie_recipe_url='http://lumexralph.com',
  cookie_sku='CC02',
  quantity=42,
  unit_cost=0.50
)

cc_cookie_3 = Cookie(
  cookie_name='Banilla chip',
  cookie_recipe_url='http://lumexralph.com',
  cookie_sku='CC03',
  quantity=10,
  unit_cost=0.50
)

# insert a single record to the db
# session.add(instance)

# to insert many records or instances at same time
# session.bulk_save_objects([cc_cookie_2, cc_cookie_3])
# session.commit()

"""Queries
"""
# to list all the instances of a model in the db in a list
session.query(Cookie).all()

# to create an iterator from the model
session.query(Cookie)

# to get just some attributes of a particular model
session.query(Cookie.cookie_id, Cookie.cookie_name).first()

# order by is ascending by default
session.query(Cookie.cookie_id, Cookie.cookie_name).order_by(Cookie.cookie_name)

# descending
session.query(Cookie.cookie_id, Cookie.cookie_name).order_by(desc(Cookie.cookie_name))

# filter is same as where in sql
# using filter
session.query(Cookie).filter(Cookie.cookie_name == 'Milk chip').order_by(desc(Cookie.cookie_name)).limit(2)

# using filter by
session.query(Cookie).filter_by(cookie_name='Milk chip').order_by(desc(Cookie.cookie_name)).limit(2)

