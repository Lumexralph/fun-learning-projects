=====
Ogundelescrumy
=====

Ogundelescrumy is a simple Django app to carry out scrum agile development tasks process. For each user create there are roles and based on this they can interact with tasks and give them different status afterwards, just a project management tool.

Detailed documentation is in the "docs" directory.

Quick start
-----------

1. Add "ogundelescrumy" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = [
        ...
        'ogundelescrumy',
    ]

2. Include the ogundelescrumy URLconf in your project urls.py like this::

    path('ogundelescrumy/', include('ogundelescrumy.urls')),

3. Run `python manage.py migrate` to create the ogundelescrumy models.

4. Visit http://127.0.0.1:8000/ogundelescrumy/ .