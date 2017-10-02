
import json
import re

from django.core.exceptions import ValidationError
from creeps.models import (Creep, Size, Type, Subtype, Alignment, Skill,
                            CreepSkill)

def get_string(creep_data, name, required=True):
    val = creep_data.pop(name)
    if val is None or len(val) == 0:
        if required:
            raise ValidationError(
                        'Required field %s not present' % name)
        else:
            return None
    return val

def get_int(creep_data, name, required=True):
    val = creep_data.pop(name)
    if val is None:
        if required:
            raise ValidationError(
                        'Required field %s not present' % name)
        else:
            return None
    return int(val)

def get_hitdice(creep_data, required=True):
    val = creep_data.pop('hit_dice')
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

check_extra_fields = False

def get_creep_skills(creep_data):

    creep_skill_names = list(filter(lambda skill: skill in creep_data.keys(),
                            skill_names))
    creep_skill_vals = [creep_data.pop(skill) for skill in creep_skill_names]

    return [(name, val)
                for name, val in zip(creep_skill_names, creep_skill_vals)]

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
        creep_skills = get_creep_skills(creep_data)
        creep_skills_obj = list(
                            map(lambda skill:
                                    (Skill.objects.get(skill=skill[0]), skill[1]),
                                creep_skills))

        name = creep_data.pop('name').lower()
        print('Processing creep: ' + name)

        if check_extra_fields:
            if len(creep_data) > 0:
                raise Exception('fields remaining on creep %s \n %s' %
                                (name, creep_data.keys()))

        creep, created = Creep.objects.get_or_create(name=name, woc=True,
                size=size, type=type, subtype=subtype, alignment=alignment,
                armor_class=armor_class, hit_points=hit_points, speed=speed,
                strength=strength, dexterity=dexterity, 
                constitution=constitution, intelligence=intelligence,
                wisdom=wisdom, charisma=charisma, hitdice_num=hitdice_num,
                hitdice_type=hitdice_type, senses=senses)

        creep.save()

        for creep_skill in creep_skills_obj:
            creep_skill, added = CreepSkill.objects.get_or_create(
                            skill=creep_skill[0], modifier=creep_skill[1])
            creep.skills.add(creep_skill)


