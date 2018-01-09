import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATIONS_KEY = 'Flashcards:notifications'
const DECKS_KEY = 'DECKS'

export function setDecks(decks) {
    AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
}

export function getDecks() {
    return AsyncStorage.getItem(DECKS_KEY)
}

export function saveDeckTitle(title) {
    return getDecks()
    .then((res) => JSON.parse(res) )
    .then( (decks) => {

        if (!decks) {
            decks = { }
        }

        let keyExist = Object.keys(decks).filter((key) => key === title)

        // check if the deck title already exists
        if (keyExist.length === 0) {
            decks[title] = {
                title,
                questions: []
            }
        
            setDecks(decks)
        }
        else {
            // the title already exists. i have to return an error
            throw 'Deck already present'
        }
    })
    .catch((error) => { return error })
}

export function addCardToDeck(title, card) {
    return getDecks()
    .then((res) => JSON.parse(res))
    .then(( decks) => {
        decks[title].questions.push(card)
        setDecks(decks)
    })
}

export function getDeck(title) {
    return AsyncStorage.getItem(DECKS_KEY)
        .then((res) => JSON.parse(res))
        .then((decks) => {
            return decks[title]
        })
}

export function saveCompletedQuiz(date) {
    return AsyncStorage.getItem('QUIZ')
        .then( (res) => JSON.parse(res))
        .then((data) => {

                if (!data) {
                    data = { 'completedQuiz': [] }
                }
                    
                if (!data['completedQuiz'].includes(date))
                    data['completedQuiz'].push(date)

                AsyncStorage.setItem('QUIZ', JSON.stringify(data))
            }
        )
}

export function clearLocalNotifications() {
    return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
    return {
        title: 'Study today!',
        body: 'Remember to do a quiz today!',
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATIONS_KEY)
        .then(JSON.parse)
        .then((data) => {

            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()

                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1 )
                        tomorrow.setHours(18)
                        tomorrow.setMinutes(0)

                        Notifications.scheduleLocalNotificationAsync(
                            createNotification(),
                            {
                                time: tomorrow,
                                repeat: 'day'
                            }
                        )

                        AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}