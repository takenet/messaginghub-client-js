import Lime from 'lime-js';
import WebSocketTransport from 'lime-transport-websocket';
import MessagingHubClient from './Client';
import Application from './Application';

/* istanbul ignore next */
export default class ClientBuilder {

    constructor() {
        this._application = new Application();
    }

    withApplication(application) {
        this._application = application;
        return this;
    }

    withIdentifier(identifier) {
        this._application.identifier = identifier;
        return this;        
    }

    withInstance(instance) {
        this._application.instance = instance;
        return this;
    }
    
    // withDomain :: String -> ClientBuilder
    withDomain(domain) {
        this._application.domain = domain;
        return this;
    }

    // withScheme :: String -> ClientBuilder
    withScheme(scheme) {
        this._application.scheme = scheme;
        return this;
    }

    // withHostName :: String -> ClientBuilder
    withHostName(hostName) {
        this._application.hostName = hostName;
        return this;
    }

    withPort(port) {
        this._application.port = port;
    }

    withAccessKey(accessKey) {
        this._application.authentication = new Lime.KeyAuthentication();
        this._application.authentication.key = accessKey;
        return this;
    }

    withPassword(password) {
        this._application.authentication = new Lime.PlainAuthentication();
        this._application.authentication.password = password;
        return this;
    }

    // withCompression :: Lime.SessionCompression.NONE -> ClientBuilder
    withCompression(compression) {
        this._application.compression = compression;
        return this;
    }

    // withEncryption :: Lime.SessionEncryption.NONE -> ClientBuilder
    withEncryption(encryption) {
        this._application.encryption = encryption;
        return this;
    }
    
    withRoutingRule(routingRule) {
        this._application.presence.routingRule = routingRule;
        return this;
    }

    withEcho(echo) {
        this._application.presence.echo = echo;
        return this;
    }

    withPriority(priority) {
        this._application.presence.priority = priority;
        return this;
    }

    build() {
        let uri = `${this._application.scheme}://${this._application.hostName}:${this._application.port}`; 
        let transportFactory = () => new WebSocketTransport();
        return new MessagingHubClient(uri, transportFactory, this._application);
    }
}