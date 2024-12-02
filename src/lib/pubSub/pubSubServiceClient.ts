import { WebPubSubServiceClient } from '@azure/web-pubsub';

export default new WebPubSubServiceClient(
    "Endpoint=https://tfex-webpubsub.webpubsub.azure.com;AccessKey=CLuEsmBzrfvCh1JQMDSQHbgAosVCc1Hi1D2aFabx9j20RJSpztGVJQQJ99AKACYeBjFXJ3w3AAAAAWPS9KFH;Version=1.0;", // connection string
    "rooms" // hubname
);