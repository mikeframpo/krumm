from django.db import models
from django.core.exceptions import ValidationError

CHARFIELD_DEFAULT = 50

def validate_nonempty(value):
    if len(value) == 0:
        raise ValidationError('field must be non-empty')

class Size(models.Model):
    size=models.CharField(max_length=CHARFIELD_DEFAULT,
                            validators=[validate_nonempty])

class Creep(models.Model):
    name=models.CharField(max_length=CHARFIELD_DEFAULT,
                            validators=[validate_nonempty])
    size=models.ForeignKey(Size, on_delete=models.CASCADE)

