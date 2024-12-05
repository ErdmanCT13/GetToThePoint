import { WebPubSubServiceClient } from '@azure/web-pubsub';
import { PUB_SUB_CONNECTION_STRING } from '$env/static/private';

export default new WebPubSubServiceClient(
    PUB_SUB_CONNECTION_STRING, // connection string
    "rooms" // hubname
);