from django.shortcuts import render
from .forms import Survey, Contacts
import requests
from WAC_landing.keys import token
import WAC_landing.data as static_data
from django.shortcuts import redirect


TEST_MODE = False


def createMessage(data, place_from):
    message = place_from + '\n'
    message += 'Компания: ' + data['company'] + '\n'
    message += 'Телефон: ' + data['number'] + '\n'
    message += 'Сфера: ' + data['industry'] + '\n'
    if 'reserve_industry' in data:
        message += 'Сфера: ' + data['reserve_industry'] + '\n'
    message += 'Проблема: ' + data['problem'] + '\n'
    if 'reserve_problem' in data:
        message += 'Проблема: ' + data['reserve_problem'] + '\n'
    message += 'Критичность: ' + data['scale'] + '\n'
    return message


def account(request):
    context = {'anchor': None,
               'errors': None,
               'massage': None,
               'contact_phone': static_data.contact_phone,
               'contact_email': static_data.contact_email,
               'contact_telegram': static_data.contact_telegram}
    if request.method == 'POST':
        form = Contacts(request.POST)
        target = '[Авторизация]\n'
        message = 'Просьба связаться\n' + target + form.data['fio'] + '\n' + form.data['phone']
        if TEST_MODE:
            print(message)
        else:
            requests.get(
                'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + static_data.chat + '&text=' + message)
    context['form2'] = Contacts()
    return render(request, 'landing/account.html', context)


def landing(request):
    return redirect('/home')


def home(request):
    context = {'anchor': None,
               'errors': None,
               'massage': None,
               'contact_phone': static_data.contact_phone,
               'contact_email': static_data.contact_email,
               'contact_telegram': static_data.contact_telegram}

    if request.method == 'POST':

        # print(request.POST)
        form = Survey(request.POST)

        if 'send' in request.POST:
            data = {}
            if form.data['number'] != '':
                data['number'] = form.data['number']
            else:
                context['errors'] = 'Введите телефон'

            if form.data['problem'] != '':
                if form.data['problem'] == '99':
                    if form.data['reserve_problem'] != '':
                        data['reserve_problem'] = form.data['reserve_problem']
                    else:
                        context['show_reserve_problem'] = True
                        context['errors'] = 'Введите проблему'
                data['problem'] = form.data['problem']
            else:
                context['errors'] = 'Выберите проблему'

            if form.data['industry'] != '':
                if form.data['industry'] == '99':
                    if form.data['reserve_industry'] != '':
                        data['reserve_industry'] = form.data['reserve_industry']
                    else:
                        context['show_reserve_industry'] = True
                        context['errors'] = 'Введите сферу'
                data['industry'] = form.data['industry']
            else:
                context['errors'] = 'Выберите сферу'

            if form.data['company'] != '':
                data['company'] = form.data['company']
            else:
                context['errors'] = 'Введите команию'
            if 'scale' in form.data.keys():
                data['scale'] = form.data['scale']
            else:
                context['errors'] = 'Оцените масштаб вашей проблемы'

            if not context['errors']:
                message = createMessage(data, 'Результат опроса')
                if TEST_MODE:
                    print(message)
                else:
                    requests.get('https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + static_data.chat + '&text=' + message)

                form = Survey()
                context['massage'] = 'Данные отправлены'
                context.pop('anchor')
                if 'show_reserve_problem' in context:
                    context.pop('show_reserve_problem')
                if 'show_reserve_industry' in context:
                    context.pop('show_reserve_industry')
            else:
                context['anchor'] = 'survey'
        elif 'consult' in request.POST or 'development' in request.POST:
            if 'consult' in request.POST:
                target = '[Юридическая консультация]\n'
            else:
                target = '[Техническая консультация]\n'
            message = 'Просьба связаться\n' + target + form.data['fio'] + '\n' + form.data['phone']
            if TEST_MODE:
                print(message)
            else:
                requests.get('https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + static_data.chat + '&text=' + message)
            form = Survey()
    # num_visits = request.session.get('num_visits', 0)
    # request.session['num_visits'] = num_visits + 1
    # print(num_visits, request.session)
    else:
        form = Survey()
    context['form'] = form
    context['form2'] = Contacts()
    # print(context)
    return render(request, 'landing/home.html', context)
