import requests
import asyncio
import time
from bitrix24 import *

bx24 = Bitrix24('https://wearechain.bitrix24.ru/rest/18/bu5ryb6ft5uk6oiq')


def callBitrixContacts(target, fio, number):
    if target == '[Юридическая консультация]':
        category_id = 22
    else:
        category_id = 14
    try:
        bx24.callMethod('crm.deal.add', fields={'TITLE': 'Заявка с сайта ' + target,
                                                'ASSIGNED_BY_ID': 12,
                                                'CATEGORY_ID': category_id,
                                                'UF_CRM_1673700918967': number,
                                                'UF_CRM_1673710319843': fio
                                                })
    except BitrixError as message:
        print(message)


def callBitrixForm(company, number, idstr, prblm, scale):
    try:
        bx24.callMethod('crm.deal.add', fields={'TITLE': 'Заявка с сайта [Результат опроса]',
                                                'ASSIGNED_BY_ID': 12,
                                                'CATEGORY_ID': 14,
                                                'UF_CRM_1673700918967': number,
                                                'UF_CRM_1673710066261': company,
                                                'UF_CRM_1673709967342': scale,
                                                'UF_CRM_1673709948002': prblm,
                                                'UF_CRM_1673709334813': idstr
                                                })
    except BitrixError as message:
        print(message)


def t2():
    try:
        print(bx24.callMethod('crm.deal.get', ID=482))
    except BitrixError as message:
        print(message)

# t2()