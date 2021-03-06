# Generated by Django 3.2.6 on 2021-09-28 23:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tendencias', '0019_matriculadosposgradoedad_matriculadosposgradoestrato_matriculadosposgradosexo'),
    ]

    operations = [
        migrations.CreateModel(
            name='MatriculadosCategoriaInscripcion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Semestre', models.CharField(max_length=255, null=True, verbose_name='Semestre')),
                ('General', models.IntegerField(null=True, verbose_name='General')),
                ('RestoRisaralda', models.IntegerField(null=True, verbose_name='Resto de Risaralda')),
                ('RegimenEspecial', models.IntegerField(null=True, verbose_name='Regimen Especial')),
                ('Total', models.IntegerField(null=True, verbose_name='Total')),
            ],
        ),
        migrations.CreateModel(
            name='MatriculadosEstrato',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Semestre', models.CharField(max_length=255, null=True, verbose_name='Semestre')),
                ('Estrato0', models.IntegerField(null=True, verbose_name='Estrato0')),
                ('EstratoI', models.IntegerField(null=True, verbose_name='EstratoI')),
                ('EstratoII', models.IntegerField(null=True, verbose_name='EstratoII')),
                ('EstratoIII', models.IntegerField(null=True, verbose_name='EstratoIII')),
                ('EstratoIV', models.IntegerField(null=True, verbose_name='EstratoIV')),
                ('EstratoV', models.IntegerField(null=True, verbose_name='EstratoV')),
                ('EstratoVI', models.IntegerField(null=True, verbose_name='EstratoVI')),
                ('Total', models.IntegerField(null=True, verbose_name='Total')),
            ],
        ),
        migrations.CreateModel(
            name='MatriculadosNivelFormacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Semestre', models.CharField(max_length=255, null=True, verbose_name='Semestre')),
                ('Posgrado', models.IntegerField(null=True, verbose_name='Posgrado')),
                ('Pregrado', models.IntegerField(null=True, verbose_name='Pregrado')),
                ('Total', models.IntegerField(null=True, verbose_name='Total')),
            ],
        ),
        migrations.CreateModel(
            name='MatriculadosSexo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Semestre', models.CharField(max_length=255, null=True, verbose_name='Semestre')),
                ('Masculino', models.IntegerField(null=True, verbose_name='Masculino')),
                ('Pregrado', models.IntegerField(null=True, verbose_name='Femenino')),
                ('Total', models.IntegerField(null=True, verbose_name='Total')),
            ],
        ),
        migrations.RemoveField(
            model_name='matriculadospregradosexo',
            name='Femenino',
        ),
        migrations.AddField(
            model_name='matriculadospregradosexo',
            name='Pregrado',
            field=models.IntegerField(null=True, verbose_name='Femenino'),
        ),
    ]
