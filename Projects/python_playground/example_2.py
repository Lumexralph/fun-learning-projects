# import datetime as dt
# from marshmallow import Schema, fields, pprint, post_load

# # create a model for the db
# class User(object):
#   def __init__(self, name, email):
#     self.name = name
#     self.email = email
#     self.created_at = dt.datetime.now()


#   def __repr__(self):
#     return '<User (name={self.name!r})>'.format(self=self)


# class UserSchema(Schema):
#   name = fields.Str()
#   email = fields.Email()
#   created_at = fields.DateTime()

#   @post_load
#   def make_user(self, data):
#     return User(**data)


# user = User(name="Olumide", email="olumideralph@gmail.com") # data from the model

# user_data = {
#     'email': 'ken@yahoo.com',
#     'name': 'Ken'
# }

# user1 = User(name="Mick", email="mick@stones.com")
# user2 = User(name="Keith", email="keith@stones.com")
# users = [user1, user2]

# # you should have instance of thr schema
# user_schema = UserSchema()

# # format the data using thr schema, serializing data
# data, error = user_schema.dump(users, many=True)

# pprint(data)
from marshmallow import ValidationError, Schema, fields

class UserSchema(Schema):
    name = fields.String(required=True)
    age = fields.Integer(
        required=True,
        error_messages={'required': 'Age is required.'}
    )
    city = fields.String(
        required=True,
        error_messages={'required': {'message': 'City required', 'code': 400}}
    )
    email = fields.Email()

try:
    result = UserSchema().load({'email': 'foo@bar.com'})
except ValidationError as err:
    err.messages
# {'name': ['Missing data for required field.'],
#  'age': ['Age is required.'],
#  'city': {'message': 'City required', 'code': 400}}
