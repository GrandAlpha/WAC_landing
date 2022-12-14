from django import forms
from WAC_landing.data import CHOICES_industry, CHOICES_problem


class MyCharField(forms.CharField):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ""


class MyChoiceField(forms.ChoiceField):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ""


class Survey(forms.Form):
    company = MyCharField(label='Компания', max_length=100, required=False, widget=forms.TextInput(attrs={
        'placeholder': 'Введите название компании',
        'class': "form-control"}))
    industry = MyChoiceField(label='Отрасль', choices=CHOICES_industry, required=False, widget=forms.Select(attrs={
        'class': "custom-select custom-select"}))
    reserve_industry = MyCharField(label='Отрасль', max_length=100, required=False, widget=forms.TextInput(attrs={
        'placeholder': 'Введите название вашей отрасли',
        'class': "form-control"}))

    problem = MyChoiceField(label='Проблема', choices=CHOICES_problem, required=False, widget=forms.Select(attrs={
        'class': "custom-select custom-select"}))
    reserve_problem = MyCharField(label='Проблема', max_length=100, required=False, widget=forms.TextInput(attrs={
        'placeholder': 'Введите проблему',
        'class': "form-control"}))

    number = MyCharField(label='Телефон', max_length=20, required=False, widget=forms.TextInput(attrs={
        'placeholder': '+7(***) ** * ** **',
        'class': "form-control"}))

    scale = forms.IntegerField(
        widget=forms.NumberInput(attrs={'type': 'range', 'min': '1', 'max': '10', 'id': 'InputValue',
            'list': "tickmarks", 'onchange': "document.getElementById('rangeValue').innerHTML = this.value;"}),
        required=False)


class Contacts(forms.Form):
    fio = MyCharField(label='Компания', max_length=100, required=False, widget=forms.TextInput(attrs={
        'placeholder': 'Введите ФИО',
        'class': "form__input"}))
    phone = MyCharField(label='Телефон', max_length=20, required=False, widget=forms.TextInput(attrs={
        'placeholder': '+7(***) ** * ** **',
        'class': "form__input"}))
