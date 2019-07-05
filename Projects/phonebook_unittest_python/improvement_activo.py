"""The base_validator.py can further simplified
  using the default statement other than the condition to check if the 
  status was provided, we can use default value argument and also remove json imported
  that was not used
"""

from flask import Blueprint

middleware_blueprint = Blueprint('middleware', __name__)


class ValidationError(Exception):
    """Base Validation class for handling validation errors"""

    def __init__(self, error, status_code=400):
        Exception.__init__(self)
        self.status_code = status_code
        self.error = error
        self.error['status'] = 'error'
        self.error['message'] = error['message']

    def to_dict(self):
        return self.error


""" The decorator function in token_required.py 
    I suggest that the function used as parameter should be changed to 
    name like func because for posterity to protect them when they want to use 
    function built keyword in python and the one used in the function is already
    shadowing that of built in python, just to avoid confusion that might make debugging 
    difficult if that happens, we never know
"""
def token_required(func):
    """Authentication decorator. Validates token from the client"""


"""In model __init__.py file, I'll suggest the name of the variable push_id not  be
  shadowed to avoid confusion and make our codebase more readable for whoever is on-boarding
  i propose changing it to id which is the actual thing created by the function
"""
def fancy_id_generator(mapper, connection, target):
    """A function to generate unique identifiers on insert."""
    id_factory = PushID()
    target.id = id_factory.next_id()

