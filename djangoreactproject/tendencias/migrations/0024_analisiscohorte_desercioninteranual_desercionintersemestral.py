# Generated by Django 3.2.6 on 2021-09-29 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tendencias', '0023_auto_20210929_1948'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnalisisCohorte',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CANTIDAD', models.IntegerField(null=True, verbose_name='Cantidad')),
                ('COD_PERIODO', models.CharField(max_length=255, null=True, verbose_name='Semestre')),
                ('IDPER', models.IntegerField(null=True, verbose_name='IDPER')),
                ('COD_UTP', models.CharField(max_length=255, null=True, verbose_name='Código UTP')),
                ('ESTADO', models.IntegerField(null=True, verbose_name='Estado')),
            ],
        ),
        migrations.CreateModel(
            name='DesercionInterAnual',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CANTIDAD', models.IntegerField(null=True, verbose_name='Cantidad')),
                ('ESTADO', models.CharField(max_length=255, null=True, verbose_name='Estado')),
                ('PERBASE', models.IntegerField(null=True, verbose_name='Periodo base')),
                ('COD_PERIODO', models.CharField(max_length=255, null=True, verbose_name='Semestre')),
                ('COD_UTP', models.CharField(max_length=255, null=True, verbose_name='Código UTP')),
                ('NIVEL', models.CharField(max_length=255, null=True, verbose_name='Nivel')),
                ('SUBNIVEL', models.CharField(max_length=255, null=True, verbose_name='Subnivel')),
                ('NOMBRE', models.CharField(max_length=255, null=True, verbose_name='Programa Academico')),
                ('DURACION_SEMESTRES', models.IntegerField(null=True, verbose_name='Duración en semestres')),
                ('PERIODOS', models.CharField(max_length=255, null=True, verbose_name='Periodos')),
            ],
        ),
        migrations.CreateModel(
            name='DesercionInterSemestral',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ESTADO', models.IntegerField(null=True, verbose_name='Estado')),
                ('PERBASE', models.IntegerField(null=True, verbose_name='Periodo base')),
                ('COD_PERIODO', models.CharField(max_length=255, null=True, verbose_name='Semestre')),
                ('COD_UTP', models.CharField(max_length=255, null=True, verbose_name='Código UTP')),
                ('NIVEL', models.CharField(max_length=255, null=True, verbose_name='Nivel')),
                ('SUBNIVEL', models.CharField(max_length=255, null=True, verbose_name='Subnivel')),
                ('NOMBRE', models.CharField(max_length=255, null=True, verbose_name='Programa Academico')),
                ('DURACION_SEMESTRES', models.IntegerField(null=True, verbose_name='Duración en semestres')),
                ('PERIODOS', models.CharField(max_length=255, null=True, verbose_name='Periodos')),
                ('CANTIDAD', models.IntegerField(null=True, verbose_name='Cantidad')),
            ],
        ),
    ]