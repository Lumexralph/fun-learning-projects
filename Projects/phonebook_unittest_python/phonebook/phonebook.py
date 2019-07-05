class Phonebook:
  def __init__(self):
    self.entries = {}


  def add(self, name, number):
    self.entries[name] = number


  def lookup(self, name):
    return self.entries.get(name)


  def is_consistent(self):
    return True

  def names(self):
    return self.entries