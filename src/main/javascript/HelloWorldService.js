export default class HelloWorldService {
    constructor(rest) {
        this.rest = rest;
    }

    request(data) {
        this.rest('/hello').then((response) => data(response.entity))
    }
}