from datetime import datetime

from sqlalchemy import (create_engine, MetaData, Table, Column, Integer,
                        Numeric, String, ForeignKey, DateTime, Boolean, insert,
                        cast, update, text)
from sqlalchemy.sql import select, func
engine = create_engine('postgresql+psycopg2://postgres:password@localhost:5432/Test2',
                        echo=True)

# open a connection to the db using the connect()
connection = engine.connect()

# Now that we have a database connection, we can start
# using either SQLAlchemy Core or the ORM

# The first thing we must do is define what data our tables hold
# before we do that, we will have to have the metadata
metadata = MetaData('postgresql+psycopg2://postgres:' 
                        'password@localhost:5432/Test2')

cookies = Table('cookies', metadata,
                Column('cookie_id', Integer(), primary_key=True),
                Column('cookie_name', String(50), index=True),
                Column('cookie_recipe_url', String(255)),
                Column('cookie_sku', String(55)),
                Column('quantity', Integer()),
                Column('unit_cost', Numeric(12, 2)))

users = Table(
    'users', metadata, Column('user_id', Integer(), primary_key=True),
    Column('username', String(15), nullable=False, unique=True),
    Column('email_address', String(255), nullable=False),
    Column('phone', String(20), nullable=False),
    Column('password', String(25), nullable=False),
    Column('created_on', DateTime(), default=datetime.now),
    Column(
        'updated_on', DateTime(), default=datetime.now, onupdate=datetime.now))

orders = Table('orders', metadata,
               Column('order_id', Integer(), primary_key=True),
               Column('user_id', ForeignKey('users.user_id')),
               Column('shipped', Boolean(), default=False))
line_items = Table('line_items', metadata,
                   Column('line_items_id', Integer(), primary_key=True),
                   Column('order_id', ForeignKey('orders.order_id')),
                   Column('cookie_id', ForeignKey('cookies.cookie_id')),
                   Column('quantity', Integer()),
                   Column('extended_cost', Numeric(12, 2)))

# it is time to persist the tables to the db
# metadata.create_all(engine)

# # inserting data
# ins = cookies.insert()

# ins.compile().params

# inventory_list = [{
#     'cookie_name':
#     'peanut butter',
#     'cookie_recipe_url':
#     'http://some.aweso.me/cookie/peanut.html',
#     'cookie_sku':
#     'PB01',
#     'quantity':
#     '24',
#     'unit_cost':
#     '0.25'
# },
#   {
#       'cookie_name':
#       'oatmeal raisin',
#       'cookie_recipe_url':
#       'http://some.okay.me/cookie/raisin.html',
#       'cookie_sku':
#       'EWW01',
#       'quantity':
#       '100',
#       'unit_cost':
#       '1.00'
#   }]

# result = connection.execute(
#     ins, inventory_list)

# print(result)

# s = select([cookies])
# print(s)

# rp = connection.execute(s)

# tell the ResultProxy to return all the rows
# results = rp.fetchall()

# first_row = results[0]

# print(first_row[cookies.c.cookie_name])

# first_row = results[0]
# first_row[1] # Access column by index
# first_row.cookie_name  # Access column by column name
# first_row[cookies.c.cookie_name] # Access column by Column object

# s = select([func.sum(cookies.c.quantity)])
# rp = connection.execute(s)
# print(rp.scalar())

# s = select([func.count(cookies.c.cookie_name).label('inventory_count')])
# rp = connection.execute(s)
# record = rp.first()
# print(record.keys())
# print(record.inventory_count)

# s = select([cookies]).where(cookies.c.cookie_name == 'peanut butter')
# rp = connection.execute(s)
# record = rp.first()
# print(record.items())

# s = select([cookies]).where(cookies.c.cookie_name.like('%meal%'))
# rp = connection.execute(s)
# # record = rp.first()
# print(list(rp))

#  using operators with where
# s = select([cookies.c.cookie_name, 'SKU-' + cookies.c.cookie_sku])
# for row in connection.execute(s):
#     print(row)

# s = select([cookies.c.cookie_name,
#           cast((cookies.c.quantity * cookies.c.unit_cost),
#                Numeric(12,2)).label('inv_cost')])
# for row in connection.execute(s):
#     print('{} - {}'.format(row.cookie_name, row.inv_cost))

# u = update(cookies).where(cookies.c.cookie_name == 'oatmeal raisin')
# u = u.values(quantity=(cookies.c.quantity + 120))
# result = connection.execute(u)
# print(result.rowcount)
"""======================================================================"""
customer_list = [{
    'username': 'cookiemon',
    'email_address': 'mon@cookie.com',
    'phone': '111-111-1111',
    'password': 'password'
},
                 {
                     'username': 'cakeeater',
                     'email_address': 'cakeeater@cake.com',
                     'phone': '222-222-2222',
                     'password': 'password'
                 },
                 {
                     'username': 'pieguy',
                     'email_address': 'guy@pie.com',
                     'phone': '333-333-3333',
                     'password': 'password'
                 }]
# ins = insert(users).values(customer_list)
# result = connection.execute(ins)

# result = connection.execute(select([users]))
# for user in result:
#     print({
#         'user_id': user.user_id,
#         'username': user.username,
#         'email': user.email_address,
#         'phone': user.phone,
#     })

# ins = insert(orders).values(user_id=1, order_id=1)
# result = connection.execute(ins)
# order_items = [{
#     'order_id': 1,
#     'cookie_id': 1,
#     'quantity': 2,
#     'extended_cost': 1.00
# }, {
#     'order_id': 1,
#     'cookie_id': 2,
#     'quantity': 12,
#     'extended_cost': 3.00
# }]

# ins = insert(line_items).values(order_items)
# connection.execute(ins)

# ins = insert(orders).values(user_id=2, order_id=2)
# result = connection.execute(ins)

# order_items = [{
#     'order_id': 2,
#     'cookie_id': 1,
#     'quantity': 24,
#     'extended_cost': 12.00
# }, {
#     'order_id': 2,
#     'cookie_id': 2,
#     'quantity': 6,
#     'extended_cost': 6.00
# }]

# ins = insert(line_items).values(order_items)
# connection.execute(ins)

# columns = [orders.c.order_id, users.c.username, users.c.phone,
#            cookies.c.cookie_name, line_items.c.quantity,
#            line_items.c.extended_cost]

# cookiemon_orders = select(columns)
# cookiemon_orders = cookiemon_orders.select_from(orders.join(users).join(line_items)
#                     .join(cookies)).where(users.c.username == 'cookiemon')
# result = connection.execute(cookiemon_orders).fetchall()

# for row in result:
#     print(row)

# columns = [users.c.username, func.count(orders.c.order_id)]
# all_orders = select(columns)
# all_orders = all_orders.select_from(users.outerjoin(orders))
# all_orders = all_orders.group_by(users.c.username)
# result = connection.execute(all_orders).fetchall()
# for row in result:
#     print(row)

result = connection.execute(text("SELECT * FROM orders")).fetchall()
print(result)
