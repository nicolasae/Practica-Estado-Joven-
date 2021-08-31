# Generated by Django 3.2.6 on 2021-08-31 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tendencias', '0008_matriculadosegunedad'),
    ]

    operations = [
        migrations.CreateModel(
            name='MatriculadoSegunSexo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Programa', models.CharField(max_length=255, null=True, verbose_name='Programa Académico')),
                ('Femenino', models.IntegerField(null=True, verbose_name='Femenino')),
                ('Masculino', models.IntegerField(null=True, verbose_name='Masculino')),
                ('Año', models.CharField(max_length=255, null=True, verbose_name='Año')),
            ],
        ),
    ]
