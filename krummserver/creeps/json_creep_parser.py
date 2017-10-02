
import json
from django.core.exceptions import ValidationError

from creeps.models import Creep, Size, Type, Subtype, Alignment

def get_string(creep_data, name, required=True):
    val = creep_data[name]
    if val is None or len(val) == 0:
        if required:
            raise ValidationError(
                        'Required field %s not present' % name)
        else:
            return None
    return val

def get_int(creep_data, name, required=True):
    val = creep_data[name]
    if val is None:
        if required:
            raise ValidationError(
                        'Required field %s not present' % name)
        else:
            return None
    return int(val)

def parse_json_creeps(json_path):

    parsed = json.load(open(json_path))
    for creep_data in parsed:

        if 'license' in creep_data.keys():
            continue

        creep_size = get_string(creep_data, 'size')
        size, added = Size.objects.get_or_create(size=creep_size.lower())

        creep_type = get_string(creep_data, 'type')
        type, added = Type.objects.get_or_create(type=creep_type.lower())

        creep_subtype = get_string(creep_data, 'subtype', required=False)
        if creep_subtype is not None:
            subtype, added = Subtype.objects.get_or_create(
                                                subtype=creep_subtype.lower())
        else:
            subtype = None

        creep_align = get_string(creep_data, 'alignment')
        alignment, added = Alignment.objects.get_or_create(
                                            alignment=creep_align.lower())

        armor_class = get_int(creep_data, 'armor_class')
        hit_points = get_int(creep_data, 'hit_points')
        speed = get_string(creep_data, 'speed')

        strength = get_int(creep_data, 'strength')
        dexterity = get_int(creep_data, 'dexterity')
        constitution = get_int(creep_data, 'constitution')
        intelligence = get_int(creep_data, 'intelligence')
        wisdom = get_int(creep_data, 'wisdom')
        charisma = get_int(creep_data, 'charisma')

        name = creep_data['name'].lower()
        print('Processing creep: ' + name)

        creep, created = Creep.objects.get_or_create(name=name, woc=True,
                size=size, type=type, subtype=subtype, alignment=alignment,
                armor_class=armor_class, hit_points=hit_points, speed=speed,
                strength=strength, dexterity=dexterity, 
                constitution=constitution, intelligence=intelligence,
                wisdom=wisdom, charisma=charisma)

        creep.save()

