import firebase_admin
import uuid
from firebase_admin import credentials, firestore
from datetime import datetime

cred = credentials.Certificate("./serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()

userCol = db.collection('users')
betCol = db.collection('bets')
classificationCol = db.collection('classification')


def retrieveAllUsers():
    return userCol.stream()


def retrieveAllBets():
    return [bet.to_dict() for bet in betCol.stream()]


def retrieveClassificationsId():
    return [classification.id for classification in classificationCol.stream()]


def deleteClassifications():
    ids = retrieveClassificationsId()
    for id in ids:
        classificationCol.document(id).delete()
    print('Classification deleted={}'.format(ids))


def saveClassification(classification):
    classificationCol.document(str(uuid.uuid4())).set(classification)
    print('Classification saved={}'.format(classification))


def retrieveAllBetsByUser(userId=''):
    return [bet.to_dict() for bet in betCol.where('userId', '==', userId).stream()]
