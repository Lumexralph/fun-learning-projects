from flask_restplus import Resource, Api
from flask import Blueprint
import main

# from .. import api_v1from flask import  Blueprint
api_v1 = Blueprint('api_v1', __name__, url_prefix='/api/v1/')

api = Api(api_v1)


# @api_v1.route('/')
# def get():
#   return "Welcome to your first endpoint in the blueprint"

@api.route('/')
class Home(Resource):
    def get(self):
        return {'message': 'Welcome to the restful blueprint'}
