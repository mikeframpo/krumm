from django.db import models
from django.core.exceptions import ValidationError

from django.db.models import (Model, CharField, ForeignKey, IntegerField,
                                ManyToManyField, BooleanField, CASCADE)

CHARFIELD_DEFAULT = 100
ACTION_DESC_MAX = 1500

class Size(Model):
    size=CharField(max_length=CHARFIELD_DEFAULT)

class Type(Model):
    type=CharField(max_length=CHARFIELD_DEFAULT)

class Subtype(Model):
    subtype=CharField(max_length=CHARFIELD_DEFAULT)

class Alignment(Model):
    alignment=CharField(max_length=CHARFIELD_DEFAULT)

class Skill(Model):
    skill=CharField(max_length=CHARFIELD_DEFAULT)

class CreepSkill(Model):
    skill=ForeignKey(Skill, on_delete=CASCADE)
    modifier=IntegerField()

class Ability(Model):
    ability=CharField(max_length=CHARFIELD_DEFAULT)

class SavingThrow(Model):
    ability=ForeignKey(Ability, on_delete=CASCADE)
    modifier=IntegerField()

class Damage(Model):
    damage=CharField(max_length=CHARFIELD_DEFAULT)

class Condition(Model):
    condition=CharField(max_length=CHARFIELD_DEFAULT)

class Language(Model):
    language=CharField(max_length=CHARFIELD_DEFAULT)

class Action(Model):
    name=CharField(max_length=CHARFIELD_DEFAULT)
    desc=CharField(max_length=ACTION_DESC_MAX)
    attack_bonus=IntegerField(null=True)
    damage_dice=CharField(max_length=CHARFIELD_DEFAULT, null=True)
    damage_bonus=IntegerField(null=True)

class Creep(Model):
    name=CharField(max_length=CHARFIELD_DEFAULT)
    woc=BooleanField()

    size=ForeignKey(Size, on_delete=CASCADE)
    type=ForeignKey(Type, on_delete=CASCADE)
    subtype=ForeignKey(Subtype, on_delete=CASCADE, null=True)
    alignment=ForeignKey(Alignment, on_delete=CASCADE)

    armor_class = IntegerField()
    hit_points = IntegerField()
    hitdice_num = IntegerField()
    hitdice_type = CharField(max_length=4) #d100 is the max
    speed = CharField(max_length=CHARFIELD_DEFAULT)

    strength = IntegerField()
    dexterity = IntegerField()
    constitution = IntegerField()
    intelligence = IntegerField()
    wisdom = IntegerField()
    charisma = IntegerField()

    senses = CharField(max_length=CHARFIELD_DEFAULT)
    challenge_rating = CharField(max_length=CHARFIELD_DEFAULT)

    skills = ManyToManyField(CreepSkill)
    saving_throws = ManyToManyField(SavingThrow)
    damage_vulnerabilities = ManyToManyField(Damage,
                                        related_name='damage_vulnerabilities')
    damage_resistances = ManyToManyField(Damage,
                                        related_name='damage_resistances')
    damage_immunities = ManyToManyField(Damage,
                                        related_name='damage_immunities')
    condition_immunities = ManyToManyField(Condition)
    languages = ManyToManyField(Language)

    actions = ManyToManyField(Action)

