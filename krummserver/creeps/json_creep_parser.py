
import json
import re

from django.core.exceptions import ValidationError
from creeps.models import (Creep, Size, Type, Subtype, Alignment, Skill,
                            CreepSkill, Ability, SavingThrow, Damage, Condition,
                            Language, Action)

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
        'investigation',
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

    creep_skill_names = list(filter(lambda skill: skill in creep_data.keys(),
                            skill_names))
    creep_skill_vals = [creep_data.pop(skill) for skill in creep_skill_names]

    return [(name, val)
                for name, val in zip(creep_skill_names, creep_skill_vals)]

abilities = [
        'strength',
        'dexterity',
        'constitution',
        'intelligence',
        'wisdom',
        'charisma',
]

def create_abilities():

    for ability_name in abilities:
        ability, added = Ability.objects.get_or_create(ability=ability_name)
        print('Added ability: ' + ability_name)

def get_saving_throws(creep_data):

    creep_throw_names = list(filter(
        lambda throw: throw + '_save' in creep_data.keys(), abilities))
    creep_throw_vals = list(map(
        lambda throw: creep_data.pop(throw + '_save'), creep_throw_names))

    return [(throw[0], throw[1]) for throw in zip(creep_throw_names, creep_throw_vals)]

def get_creep_csvlist(creep_data, key):

    dmg_str = creep_data.pop(key)
    if len(dmg_str) == 0:
        return []
    dmg_str_list = re.split(',|;', dmg_str)
    return list(map(lambda dmg: dmg.strip(), dmg_str_list))

def get_creep_dictfield(creep_data, key):

    if key in creep_data.keys():
        return creep_data.pop(key)
    return []

def create_actions(actions):

    def get_action_field(action, key):
        if key in action.keys():
            return action[key]
        else:
            return None

    action_objs = []
    for action in actions:
        
        attack_bonus = get_action_field(action, 'attack_bonus')
        damage_dice = get_action_field(action, 'damage_dice')
        damage_bonus = get_action_field(action, 'damage_bonus')

        action_obj, added = Action.objects.get_or_create(
                                    name=action['name'],
                                    desc=action['desc'],
                                    attack_bonus=attack_bonus,
                                    damage_dice=damage_dice,
                                    damage_bonus=damage_bonus)
        action_objs.append(action_obj)

    return action_objs

def parse_json_creeps(json_path, check_extra_fields=False):

    create_skills()
    create_abilities()

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
        challenge = get_string(creep_data, 'challenge_rating', required=False)

        creep_skills = get_creep_skills(creep_data)
        creep_skills_obj = list(
                            map(lambda skill:
                                    (Skill.objects.get(skill=skill[0]), skill[1]),
                                creep_skills))

        creep_throws = get_saving_throws(creep_data)
        creep_throws_obj = map(lambda throw:
                                (Ability.objects.get(ability=throw[0]), throw[1]),   
                                    creep_throws)
        
        creep_vuln = get_creep_csvlist(creep_data, 'damage_vulnerabilities')
        creep_resist = get_creep_csvlist(creep_data, 'damage_resistances')
        creep_immun = get_creep_csvlist(creep_data, 'damage_immunities')
        condition_immun = get_creep_csvlist(creep_data, 'condition_immunities')
        creep_langs = get_creep_csvlist(creep_data, 'languages')

        creep_actions = get_creep_dictfield(creep_data, 'actions')
        creep_special_abilities = get_creep_dictfield(creep_data, 'special_abilities')
        creep_legendary_actions = get_creep_dictfield(creep_data, 'legendary_actions')
        creep_reactions = get_creep_dictfield(creep_data, 'reactions')

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
                hitdice_type=hitdice_type, senses=senses,
                challenge_rating=challenge)

        creep.save()

        for creep_skill in creep_skills_obj:
            creep_skill, added = CreepSkill.objects.get_or_create(
                            skill=creep_skill[0], modifier=creep_skill[1])
            creep.skills.add(creep_skill)

        for throw in creep_throws_obj:
            saving_throw, added = SavingThrow.objects.get_or_create(
                            ability=throw[0], modifier=throw[1])
            creep.saving_throws.add(saving_throw)

        for vuln in creep_vuln:
            damage, added = Damage.objects.get_or_create(damage=vuln)
            creep.damage_vulnerabilities.add(damage)

        for resist in creep_resist:
            damage, added = Damage.objects.get_or_create(damage=resist)
            creep.damage_resistances.add(damage)

        for immun in creep_immun:
            damage, added = Damage.objects.get_or_create(damage=immun)
            creep.damage_immunities.add(damage)

        for immun in condition_immun:
            condition, added = Condition.objects.get_or_create(condition=immun)
            creep.condition_immunities.add(condition)

        for lang in creep_langs:
            lang, added = Language.objects.get_or_create(language=lang)
            creep.languages.add(lang)

        special_abilities = create_actions(creep_special_abilities)
        for action in special_abilities:
            creep.special_abilities.add(action)

        actions = create_actions(creep_actions)
        for action in actions:
            creep.actions.add(action)

        reactions = create_actions(creep_reactions)
        for action in reactions:
            creep.reactions.add(action)

        legendary_actions = create_actions(creep_legendary_actions)
        for action in legendary_actions:
            creep.legendary_actions.add(action)
