from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.views.generic import RedirectView
from django.http import HttpRequest
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.contrib.auth.models import User
from .forms import Survey


def home(request):
    context = {'anchor': None,
               'errors': None,
               'massage': None}
    if request.method == 'POST':

        # print(request.POST)
        form = Survey(request.POST)
        if 'reserve_problem' in form.data.dict():
            context['show_reserve_problem'] = True
        if 'reserve_industry' in form.data.dict():
            context['show_reserve_industry'] = True

        if 'send' in request.POST:
            if form.data['number'] != '':
                print(form.data['number'])
            else:
                context['errors'] = 'Введите телефон'
            if 'problem' in form.data.dict():
                if form.data['problem'] != '':
                    print(form.data['problem'])
                else:
                    context['errors'] = 'Выберите проблему'
            else:
                if form.data['reserve_problem'] != '':
                    print(form.data['reserve_problem'])
                else:
                    context['errors'] = 'Введите проблему'
            if 'industry' in form.data.dict():
                if form.data['industry'] != '':
                    print(form.data['industry'])
                else:
                    context['errors'] = 'Выберите сферу'
            else:
                if form.data['reserve_industry'] != '':
                    print(form.data['reserve_industry'])
                else:
                    context['errors'] = 'Введите сферу'
            if form.data['company'] != '':
                print(form.data['company'])
            else:
                context['errors'] = 'Введите команию'

            if not context['errors']:
                form = Survey()
                context['massage'] = 'Данные отправлены'
                context.pop('anchor')
            else:
                context['anchor'] = 'survey'
        else:

            if 'show_industry' in request.POST:
                context['show_reserve_industry'] = True
                context['anchor'] = 'survey'

            elif 'hide_industry' in request.POST:
                context['show_reserve_industry'] = False
                context['anchor'] = 'survey'

            elif 'show_problem' in request.POST:
                context['show_reserve_problem'] = True
                context['anchor'] = 'survey'

            elif 'hide_problem' in request.POST:
                context['show_reserve_problem'] = False
                context['anchor'] = 'survey'
    # num_visits = request.session.get('num_visits', 0)
    # request.session['num_visits'] = num_visits + 1
    # print(num_visits, request.session)
    else:
        form = Survey()
    context['form'] = form
    # print(context)
    if 'show_reserve_industry' not in context:
        context['show_reserve_industry'] = False
    if 'show_reserve_problem' not in context:
        context['show_reserve_problem'] = False
    return render(request, 'landing/home.html', context)
