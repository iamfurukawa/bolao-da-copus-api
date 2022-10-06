import requests
import json

BASE_URL = 'http://localhost:3000'

def auth():
    headers = { 'document': '43196786803', 'password': 'Vinicius1996!' }
    response = requests.request("GET", "{}/auth".format(BASE_URL), headers=headers, data={})
    return json.loads(response.text)['access_token']


def matches():
    headers = { 'Authorization': 'Bearer {}'.format(auth()) }
    response = requests.request("GET", "{}/games/matches".format(BASE_URL), headers=headers, data={})
    return json.loads(response.text)

