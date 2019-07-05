"""
Binary search require that the array passed to it
is sorted else it won't be effective
"""


def binary_search(lists, item):
    """Find the position of an item.

    Gets the position of an item by going through a list of sorted array

    Args:
      lists: A sorted list/array.
      item: The item data to look for in the array.

    Returns:
      The item and the position in the array if found
      example:

      ['table'] , table found in position 0

      If  the item is not in the list return 'The item was not found'
    """

    low = 0
    high = len(lists) - 1  # get the starting point and end of the array

    # guess is compared to the item to know if it greater or not to either search from right or left
    # if guess is lower, the low point is updated in a loop till item is same as guess
    while low <= high:
        mid = low + high // 2  # python3  will round down the number if the product is decimal
        guess = lists[mid]  # check if the element still exists in the lists

        if guess == item:
            return f'The item {item} was found at position {mid}'

        if guess < item:
            low = mid + 1
        else: high = mid - 1

    return 'The item was not found'


list_of_items = ['a', 'b', 'c', 'd', 'e', 'f']

# search for f
print(binary_search(list_of_items, '3'))
