
import json
import re

from django.core.exceptions import ValidationError
from creeps.models import Creep, Size, Type, Subtype, Alignment, Skill

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

def get_hitdice(creep_data, required=True):
    val = creep_data['hit_dice']
    if val is None:
        if required:
            raise ValidationError(
                    'Required field %s not present' % 'hit_dice')
        else:
            return None
    match = re.match(
        r'(?P<num>[0-9]+)d(?P<type>[0-9]+)', val)
    return match['num'], match['type']

def create_skills():

    for skill_name in skill_names:
        skill, added = Skill.objects.get_or_create(skill=skill_name)
        print('added skill: ' + skill.skill)

skill_names = [
        'acrobatics',
        'animal handling',
        'arcana',
        'athletics',
        'deception',
        'history',
        'insight',
        'intimidation',
        'medicine',
        'nature',
        'perception',
        'performance',
        'persuasion',
        'religion',
        'sleight of hand',
        'stealth',
        'survival',
]

def get_creep_skills(creep_data):

    return filter(lambda skill: skill in creep_data.keys(), skill_names)

def parse_json_creeps(json_path):

    create_skills()

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
        hitdice_num, hitdice_type = get_hitdice(creep_data)

        strength = get_int(creep_data, 'strength')
        dexterity = get_int(creep_data, 'dexterity')
        constitution = get_int(creep_data, 'constitution')
        intelligence = get_int(creep_data, 'intelligence')
        wisdom = get_int(creep_data, 'wisdom')
        charisma = get_int(creep_data, 'charisma')

        senses = get_string(creep_data, 'senses', required=False)
        skill_names = list(get_creep_skills(creep_data))
        skills = list(map(lambda skill: Skill.objects.get(skill=skill),
                        skill_names))

        name = creep_data['name'].lower()
        print('Processing creep: ' + name)

        creep, created = Creep.objects.get_or_create(name=name, woc=True,
                size=size, type=type, subtype=subtype, alignment=alignment,
                armor_class=armor_class, hit_points=hit_points, speed=speed,
                strength=strength, dexterity=dexterity, 
                constitution=constitution, intelligence=intelligence,
                wisdom=wisdom, charisma=charisma, hitdice_num=hitdice_num,
                hitdice_type=hitdice_type, senses=senses)

        creep.save()

        for skill in skills:
            creep.skills.add(skill)


