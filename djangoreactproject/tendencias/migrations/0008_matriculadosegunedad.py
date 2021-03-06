# Generated by Django 3.2.6 on 2021-08-31 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tendencias', '0007_matriculadoseguncolegio'),
    ]

    operations = [
        migrations.CreateModel(
            name='MatriculadoSegunEdad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Programa', models.CharField(max_length=255, null=True, verbose_name='Programa Académico')),
                ('Menor17', models.IntegerField(null=True, verbose_name='Menor a 17 años')),
                ('Mayor17Menor22', models.IntegerField(null=True, verbose_name='Mayor a 17 años y Menor a 22 años')),
                ('Edad22', models.IntegerField(null=True, verbose_name='Edad 22 años')),
                ('Edad23', models.IntegerField(null=True, verbose_name='Edad 23 años')),
                ('Edad24', models.IntegerField(null=True, verbose_name='Edad 24 años')),
                ('Edad25', models.IntegerField(null=True, verbose_name='Edad 25 años')),
                ('Entre26Y30', models.IntegerField(null=True, verbose_name='Entre 26 y 30 años')),
                ('Mayor31', models.IntegerField(null=True, verbose_name='Mayor a 31 años')),
                ('Año', models.CharField(max_length=255, null=True, verbose_name='Año')),
            ],
        ),
    ]
