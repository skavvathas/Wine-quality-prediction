from django.db import models

# Create your models here.

class Wine(models.Model):
    volatile_acidity = models.FloatField()  # Field for floating-point numbers
    citric_acid = models.FloatField()
    residual_sugar = models.FloatField()
    chlorides = models.FloatField()
    free_sulfur_dioxide = models.FloatField()
    total_sulfur_dioxide = models.FloatField()
    density = models.FloatField()
    pH = models.FloatField()
    sulphates = models.FloatField()
    alcohol = models.FloatField()
    Type_Red_Wine = models.IntegerField()  # Field for integer values (e.g., 0 or 1)
    Type_White_Wine = models.IntegerField()

