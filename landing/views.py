from django.shortcuts import render
from .forms import Survey


def account(request):
    context = {}
    return render(request, 'landing/account.html', context)


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
            data = {}
            if form.data['number'] != '':
                data['number'] = form.data['number']
            else:
                context['errors'] = 'Введите телефон'
            if 'problem' in form.data.dict():
                if form.data['problem'] != '':
                    data['problem'] = form.data['problem']
                else:
                    context['errors'] = 'Выберите проблему'
            else:
                if form.data['reserve_problem'] != '':
                    data['reserve_problem'] = form.data['reserve_problem']
                else:
                    context['errors'] = 'Введите проблему'
            if 'industry' in form.data.dict():
                if form.data['industry'] != '':
                    data['industry'] = form.data['industry']
                else:
                    context['errors'] = 'Выберите сферу'
            else:
                if form.data['reserve_industry'] != '':
                    data['reserve_industry'] = form.data['reserve_industry']
                else:
                    context['errors'] = 'Введите сферу'
            if form.data['company'] != '':
                data['company'] = form.data['company']
            else:
                context['errors'] = 'Введите команию'
            data['scale'] = form.data['scale']

            if not context['errors']:
                print(data)
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
