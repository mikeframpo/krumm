from django.db import models
from django.core.exceptions import ValidationError

CHARFIELD_DEFAULT = 100

class Size(models.Model):
    size=models.CharField(max_length=CHARFIELD_DEFAULT)

class Type(models.Model):
    type=models.CharField(max_length=CHARFIELD_DEFAULT)

class Subtype(models.Model):
    subtype=models.CharField(max_length=CHARFIELD_DEFAULT)

class Alignment(models.Model):
    alignment=models.CharField(max_length=CHARFIELD_DEFAULT)

class Skill(models.Model):
    skill=models.CharField(max_length=CHARFIELD_DEFAULT)

class CreepSkill(models.Model):
    skill=models.ForeignKey(Skill, on_delete=models.CASCADE)
    modifier=models.IntegerField()

class Creep(models.Model):
    name=models.CharField(max_length=CHARFIELD_DEFAULT)
    woc=models.BooleanField()

    size=models.ForeignKey(Size, on_delete=models.CASCADE)
    type=models.ForeignKey(Type, on_delete=models.CASCADE)
    subtype=models.ForeignKey(Subtype, on_delete=models.CASCADE, null=True)
    alignment=models.ForeignKey(Alignment, on_delete=models.CASCADE)

    armor_class = models.IntegerField()
    hit_points = models.IntegerField()
    hitdice_num = models.IntegerField()
    hitdice_type = models.CharField(max_length=4) #d100 is the max
    speed = models.CharField(max_length=CHARFIELD_DEFAULT)

    strength = models.IntegerField()
    dexterity = models.IntegerField()
    constitution = models.IntegerField()
    intelligence = models.IntegerField()
    wisdom = models.IntegerField()
    charisma = models.IntegerField()

    senses = models.CharField(max_length=CHARFIELD_DEFAULT)
    skills = models.ManyToManyField(CreepSkill)

