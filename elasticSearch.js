import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { Client } from '@opensearch-project/opensearch';
const { awsHttpClient } = 'http-aws-es';
dotenv.config();

const esClient = new Client({
    node: process.env.ELASTICSEARCH_URL,
    connectionClass: awsHttpClient,
    amazonES: {
        region: 'ap-southeast-1',
        credentials: new AWS.Credentials(process.env.ELASTICSEARCH_PUBLIC_KEY, process.env.ELASTICSEARCH_SECRET_KEY)
    }
});

export default esClient;

