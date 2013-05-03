#!/usr/bin/env python

"""
Project-wide application configuration.

DO NOT STORE SECRETS, PASSWORDS, ETC. IN THIS FILE.
They will be exposed to users. Use environment variables instead.
"""

import os

PROJECT_NAME = 'Teenage Diaries Revisited'
PROJECT_SLUG = 'teenage-diaries'
REPOSITORY_NAME = 'teenage-diaries'

PRODUCTION_S3_BUCKETS = ['apps.npr.org', 'apps2.npr.org']
PRODUCTION_SERVERS = ['cron.nprapps.org']

STAGING_S3_BUCKETS = ['stage-apps.npr.org']
STAGING_SERVERS = ['54.245.198.194']

S3_BUCKETS = []
SERVERS = []
DEBUG = True

PROJECT_DESCRIPTION = "In 1996, Radio Diaries gave tape recorders to teenagers to create audio diaries about their lives. Amanda, Juan, Frankie, Josh and Melissa are now in their 30s and have recorded new stories about where life has led them."
SHARE_URL = 'http://%s/%s/' % (PRODUCTION_S3_BUCKETS[0], PROJECT_SLUG)

COPY_GOOGLE_DOC_KEY = '0Ala-N4Y4VPXIdFNKV00tOGpLU1gxaG1BcTB3NnBCRUE'

TWITTER = {
    'TEXT': PROJECT_NAME,
    'URL': SHARE_URL
}

FACEBOOK = {
    'TITLE': PROJECT_NAME,
    'URL': SHARE_URL,
    'DESCRIPTION': PROJECT_DESCRIPTION,
    'IMAGE_URL': 'http://apps.npr.org/teenage-diaries/img/frankie_facebook.jpg',
    'APP_ID': '138837436154588'
}

NPR_DFP = {
    'STORY_ID': '180040786',
    'TARGET': '\/arts___life;program=all_things_considered;agg=92479240;theme=92479240;storyid=180040786'
}

GOOGLE_ANALYTICS_ID = 'UA-5828686-4'


def get_secrets():
    """
    A method for accessing our secrets.
    """
    secrets = [
        'TUMBLR_CONSUMER_KEY',
        'TUMBLR_OAUTH_TOKEN',
        'TUMBLR_OAUTH_TOKEN_SECRET',
        'TUMBLR_APP_SECRET',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_ACCESS_KEY_ID'
    ]
    secrets_dict = {}
    for secret in secrets:
        secrets_dict[secret] = os.environ.get(secret, None)

    return secrets_dict


def configure_targets(deployment_target):
    """
    Configure deployment targets. Abstracted so this can be
    overriden for rendering before deployment.
    """
    global S3_BUCKETS
    global SERVERS
    global DEBUG

    if deployment_target == 'production':
        S3_BUCKETS = PRODUCTION_S3_BUCKETS
        SERVERS = PRODUCTION_SERVERS
        DEBUG = False
    else:
        S3_BUCKETS = STAGING_S3_BUCKETS
        SERVERS = STAGING_SERVERS
        DEBUG = True

DEPLOYMENT_TARGET = os.environ.get('DEPLOYMENT_TARGET', None)

configure_targets(DEPLOYMENT_TARGET)
