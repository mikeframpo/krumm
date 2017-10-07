from django.shortcuts import render
from django.http import HttpResponse

from .models import Creep

import string
import json

def load_damage_field(creep, field, creep_obj):

    damage_types = []
    for damage in getattr(creep, field).order_by('id'):
        damage_types.append(damage.damage)

    damage_str = ', '.join(damage_types)
    creep_obj[field] = damage_str

def load_actions(creep, field, creep_obj):

    actions = []
    for action in getattr(creep, field).order_by('id'):
        action_obj = { }
        action_obj['name'] = action.name
        action_obj['desc'] = action.desc
        if action.attack_bonus:
            action_obj['attack_bonus'] = action.attack_bonus
        if action.damage_dice:
            action_obj['damage_dice'] = action.damage_dice
        if action.damage_bonus:
            action_obj['damage_bonus'] = action.damage_bonus
        actions.append(action_obj)

    creep_obj[field] = actions

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
    if has_field('subtype'):
        if creep.subtype:
            creep_obj['subtype'] = creep.subtype.subtype
        else:
            creep_obj['subtype'] = ''
    if has_field('alignment'):
        creep_obj['alignment'] = creep.alignment.alignment

    if has_field('armor_class'):
        creep_obj['armor_class'] = creep.armor_class
    if has_field('hit_points'):
        creep_obj['hit_points'] = creep.hit_points
    if has_field('hitdice'):
        creep_obj['hit_dice'] \
            = str(creep.hitdice_num) + 'd' + str(creep.hitdice_type)
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

    if has_field('saving_throws'):
        for st in creep.saving_throws.order_by('ability'):
            creep_obj[st.ability.ability + '_save'] \
                    = st.modifier

    if has_field('skills'):
        for creep_skill in creep.skills.order_by('skill'):
            creep_obj[creep_skill.skill.skill] = creep_skill.modifier

    if has_field('damage_vulnerabilities'):
        load_damage_field(creep, 'damage_vulnerabilities', creep_obj)

    if has_field('damage_resistances'):
        load_damage_field(creep, 'damage_resistances', creep_obj)

    if has_field('damage_immunities'):
        load_damage_field(creep, 'damage_immunities', creep_obj)

    if has_field('condition_immunities'):
        conditions = []
        for condition in creep.condition_immunities.order_by('id'):
            conditions.append(condition.condition)
        conditions_str = ', '.join(conditions)
        creep_obj['condition_immunities'] = conditions_str

    if has_field('senses'):
        creep_obj['senses'] = creep.senses

    if has_field('languages'):
        languages = []
        for language in creep.languages.order_by('id'):
            languages.append(language.language)
        languages_str = ', '.join(languages)
        creep_obj['languages'] = languages_str

    if has_field('challenge_rating'):
        creep_obj['challenge_rating'] = creep.challenge_rating

    if has_field('special_abilities'):
        load_actions(creep, 'special_abilities', creep_obj)
    if has_field('actions'):
        load_actions(creep, 'actions', creep_obj)
    if has_field('legendary_actions'):
        load_actions(creep, 'legendary_actions', creep_obj)
    if has_field('reactions'):
        load_actions(creep, 'reactions', creep_obj)

    return json.dumps(creep_obj)

def creep_by_id(request, creep_id):
    
    creep = Creep.objects.get(id=int(creep_id))

    fields = 'all'
    if 'fields' in request.GET.keys():
        fields = request.GET['fields'].split(',')

    creep_json = get_creep_json(creep, fields)

    return HttpResponse(creep_json)

