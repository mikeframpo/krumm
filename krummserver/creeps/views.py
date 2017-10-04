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

    return json.dumps(creep_obj)

def creep_by_id(request, creep_id):
    
    creep = Creep.objects.get(id=int(creep_id))
    creep_json = get_creep_json(creep, 'all')
    return HttpResponse(creep_json)

