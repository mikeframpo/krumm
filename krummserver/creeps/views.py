from django.shortcuts import render
from django.http import HttpResponse

from .models import Creep

import string
import json

def get_creep_json(creep, fields):
    
    def has_field(field):
        if fields == 'all':
            return True
        else:
            return field in fields

    creep_obj = { }

    if has_field('name'):
        creep_obj['name'] = string.capwords(creep.name)
    if has_field('size'):
        creep_obj['size'] = string.capwords(creep.size.size)
    if has_field('type'):
        creep_obj['type'] = creep.type.type
    if creep.subtype and has_field('subtype'):
        creep_obj['subtype'] = creep.subtype.subtype
    if has_field('alignment'):
        creep_obj['alignment'] = creep.alignment.alignment

    if has_field('armor_class'):
        creep_obj['armor_class'] = creep.armor_class
    if has_field('hit_points'):
        creep_obj['hit_points'] = creep.hit_points
    if has_field('hitdice_num'):
        creep_obj['hitdice_num'] = creep.hitdice_num
    if has_field('hitdice_type'):
        creep_obj['hitdice_type'] = creep.hitdice_type
    if has_field('speed'):
        creep_obj['speed'] = creep.speed

    if has_field('strength'):
        creep_obj['strength'] = creep.strength
    if has_field('dexterity'):
        creep_obj['dexterity'] = creep.dexterity
    if has_field('constitution'):
        creep_obj['constitution'] = creep.constitution
    if has_field('intelligence'):
        creep_obj['intelligence'] = creep.intelligence
    if has_field('wisdom'):
        creep_obj['wisdom'] = creep.wisdom
    if has_field('charisma'):
        creep_obj['charisma'] = creep.charisma

    if has_field('senses'):
        creep_obj['senses'] = creep.senses

    if has_field('skills'):
        for creep_skill in creep.skills.order_by('skill').iterator():
            creep_obj[creep_skill.skill.skill] = creep_skill.modifier

    if has_field('saving_throws'):
        for st in creep.saving_throws.order_by('ability').iterator():
            creep_obj[st.ability.ability + '_save'] \
                    = st.modifier

    return json.dumps(creep_obj)

def creep_by_id(request, creep_id):
    
    creep = Creep.objects.get(id=int(creep_id))
    creep_json = get_creep_json(creep, 'all')
    return HttpResponse(creep_json)

