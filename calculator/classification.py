from datetime import datetime
import calculator
import firestore

def execute():
    table = []
    firestore.deleteClassifications()
    users = firestore.retrieveAllUsers()
    for user in users:
        bets = firestore.retrieveAllBetsByUser(user.id)
        print('bets={}'.format(bets))
        table.append(calculator.apply(user.to_dict()['name'], bets))
    firestore.saveClassification({'classification': table, 'dateTime': datetime.now().strftime("%Y/%m/%d %H:%M:%S")})

execute()