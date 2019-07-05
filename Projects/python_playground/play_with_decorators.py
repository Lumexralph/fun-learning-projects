# @decorator
# def functions(arg):
#   return 'value'

# it same as def functions(arg):
#                   return value
# functions = decorator(functions)

# create a decorator
# def repeater(old_function):
#   def new_function(*args, **kwargs):
#     # call the function it took in
#     return 2 * old_function(*args, **kwargs)

#   return new_function


# @repeater
# def multiply(num1, num2):
#   print(num1 * num2)


# multiply(6, 6)

# define a decorator that will check if the passed number
# in the function argument is 3  and create a repetition
def add_to_b_letter(old_function):
  def new_function(*args, **kwargs):
    old_function(*args, **kwargs)
    print(*args)
  return new_function

@add_to_b_letter
def create_word(letter, b):
  return letter

create_word('a', 'c')