from datetime import date
from marshmallow import Schema, fields, pprint

class ArtistSchema(Schema):
  name = fields.Str()


class AlbumSchema(Schema):
  title = fields.Str()
  release_date = fields.Date()
  artist = fields.Nested(ArtistSchema())

# data coming from request or db
lumex = dict(name='Ogundele Olumide')
album = dict(artist=lumex, title='Hunky Dory', release_date=date(1971, 12, 17))

schema = AlbumSchema()

result = schema.dump(album)

pprint(result, indent=2)