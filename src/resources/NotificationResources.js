export default class NotificationResources {
    allTokens = [];
    tokensLoaded = false;
    constructor(messaging, database) {
        this.messaging = messaging;
        this.database = database;
        try {
            this.messaging
                .requestPermission()
                .then(res => {
                    console.log('Permision granted');
                })
                .catch(err => {
                    console.log('No granted', err);
                })
        } catch (err) {
            console.log('No notification support: ', err);
        }
        this.setupTokenRefresh();
        this.database.ref('/fcmTokens').on('value', snapshot => {
            this.allTokens = snapshot.val();
            this.tokensLoaded = true;
        })
    }

    setupTokenRefresh() {
        this.messaging.onTokenRefresh(() => {
            this.saveTokenToServer();
        })
    }

    saveTokenToServer() {
        this.messaging.getToken()
            .then(res => {
                const existingTokens = this.findExistingTokens(res);
                if(existingTokens) {
                    firebase
                        .database()
                        .ref(`/fcmTokens/${existingTokens}`)
                        .set({
                            token: res,
                            user_id: this.user.uid
                        })
                } else {
                    this.registerToken(res);
                }
            })
    }

    findExistingTokens(tokenToSave) {
        for(let tokenKey in this.allTokens) {
            const token = this.allTokens[tokenKey].token;
            if(token === tokenToSave) {
                return tokenKey;
            }
        }
        return false
    }

    changeUser(user) {
        this.user = user;
        this.saveTokenToServer();
    }

    registerToken(token) {
        firebase
            .database()
            .ref('/fcmTokens')
            .push({
                token,
                user_id: this.user.uid
            })
    }
}