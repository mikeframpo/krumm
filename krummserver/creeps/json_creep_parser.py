
import json

from creeps.models import Size, Creep

def parse_json_creeps(apps, schema_editor, json_path):

    parsed = json.load(open(json_path))
    creep_data = parsed[0]
    
    size = Size.objects.get_or_create(size=creep_data['size'].lower())

    name = creep_data['name'].lower()
    print('Adding creep: ' + name)

    Creep.objects.get_or_create(name=name,
                                size=size[0])

