import pytest

from phonebook import Phonebook

@pytest.fixture
def phonebook():
  return Phonebook()

def test_add_and_lookup_entry(phonebook):
  phonebook.add('Bob', '2134')
  assert '2134' == phonebook.lookup('Bob')

def test_assert_that_name_is_found_in_phonebook(phonebook):
  phonebook.add('Bob', '2134')
  assert 'Bob' in phonebook.names()

def missing_entry_raises_KeyError(phonebook):
  with pytest.raises(KeyError):
    phonebook.lookup('misssing')