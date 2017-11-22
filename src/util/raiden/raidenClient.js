const unirest = require("unirest");

class RaidenClient {
    constructor(url, version = '1') {
        this._url = url;
        this._version = version;
        this._apis = {
            'address': `/api/${this._version}/address`,
            'tokens': `/api/${this._version}/tokens`,
            'channels': `/api/${this._version}/channels`,
            'events/channels': `/api/${this._version}/events/channels`,
            'events/network': `/api/${this._version}/events/network`,
            'connections': `/api/${this._version}/connections`,
            'transfers': `/api/${this._version}/transfers`,
        }
    }

    address() {
        return new Promise((resolve, reject) => {
            unirest.get(`${this._url}${this._apis['address']}`)
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    tokens() {
        return new Promise((resolve, reject) => {
            unirest.get(`${this._url}${this._apis['tokens']}`)
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    register(token_address) {
        return new Promise((resolve, reject) => {
            unirest.put(`${this._url}${this._apis['tokens']}/${token_address}`)
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    open(partner_address, token_address, balance, settle_timeout = 600) {
        // if(!partner_address) throw 'partner_address is required';
        // if(!token_address) throw 'token_address is required';
        // if(!Number.isInteger(balance)) throw 'balance should be number';
        return new Promise((resolve, reject) => {
            unirest.put(`${this._url}${this._apis['channels']}`)
                .type("json")
                .send({
                    partner_address,
                    token_address,
                    balance,
                    settle_timeout
                })
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    deposit(token_address, balance) {
        return new Promise((resolve, reject) => {
            unirest.patch(`${this._url}${this._apis['channels']}/${token_address}`)
                .type("json")
                .send({
                    balance
                })
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    channels(token_address, channel_address) {
        let url = `${this._url}${this._apis['channels']}`;
        if (channel_address) {
            url += `/${channel_address}`;
        }
        return new Promise((resolve, reject) => {
            unirest.get(url)
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    eventsChannels(channel_registry_address, from_block) {
        let url = `${_url}${_apis['events/network']}`;
        if (Number.isInteger(from_block)) {
            url += `?from_block${from_block}`;
        }
        return new Promise((resolve, reject) => {
            unirest.get(url)
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    eventsNetwork(from_block) {
        let url = `${this._url}${this._apis['events/channels']}/${channel_registry_address}`;
        if (Number.isInteger(from_block)) {
            url += `?from_block${from_block}`;
        }
        return new Promise((resolve, reject) => {
            unirest.get(url)
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    connect(token_address, founds) {
        return new Promise((resolve, reject) => {
            unirest.put(`${this._url}${this._apis['connections']}/${token_address}`)
                .type("json")    
                .send({
                    funds
                })
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    leave(token_address) {
        return new Promise((resolve, reject) => {
            unirest.delete(`${this._url}${this._apis['connections']}/${token_address}`)
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    transfer(token_address, target_address, amount) {
        return new Promise((resolve, reject) => {
            unirest.post(`${this._url}${this._apis['transfers']}/${token_address}/${target_address}`)
                .type("json")    
                .send({
                    amount
                })
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    partners(token_address) {
        return new Promise((resolve, reject) => {
            unirest.post(`${this._url}${this._apis['tokens']}/${token_address}/partners`)
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    close(channel_address) {
        return new Promise((resolve, reject) => {
            unirest.patch(`${this._url}${this._apis['channels']}/${channel_address}`)
                .type("json")
                .send({
                    "state": "closed"
                })
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }

    settle(channel_address) {
        return new Promise((resolve, reject) => {
            unirest.patch(`${this._url}${this._apis['channels']}/${channel_address}`)
                .type("json")
                .send({
                    "state": "settled"
                })
                .end(function (response) {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }
}



module.exports = RaidenClient