=============
DRF JS SOCIAL
=============


An integration between python-social-auth and django-rest-framework.
This package depends on python-social-auth and django-rest-framework.


Setup
-----

settings.py
-----------

1. Add "drf_js_social" to INSTALLED_APPS:

      INSTALLED_APPS = {
        ...
        'rest_framework',
        'rest_framework.authtoken',
        'social.apps.django_app.default',
        'drf_js_social'
      }


2. Setup TEMPLATE_CONTEXT_PROCESSORS


    TEMPLATE_CONTEXT_PROCESSORS = (
        "django.contrib.auth.context_processors.auth",
        "django.core.context_processors.debug",
        "django.core.context_processors.i18n",
        "django.core.context_processors.media",
        "django.core.context_processors.static",
        "django.core.context_processors.tz",
        "django.contrib.messages.context_processors.messages",
        'social.apps.django_app.context_processors.backends',
        'social.apps.django_app.context_processors.login_redirect',
    )



3. Setup AUTHENTICATION_BACKENDS:

    AUTHENTICATION_BACKENDS = (
        'social.backends.twitter.TwitterOAuth',
        'social.backends.dropbox.DropboxOAuth2',
        'social.backends.github.GithubOAuth2',
        'django.contrib.auth.backends.ModelBackend',
    )

4. Setup secrets and keys

    SOCIAL_AUTH_TWITTER_SECRET = "xxcxcxc"
    SOCIAL_AUTH_TWITTER_KEY = "ytytytyty"

    SOCIAL_AUTH_DROPBOX_OAUTH2_KEY = 'sdffdf'
    SOCIAL_AUTH_DROPBOX_OAUTH2_SECRET = 'dfsdsfdfsdfadfs'


    SOCIAL_AUTH_GITHUB_KEY = 'adsadadadasda'
    SOCIAL_AUTH_GITHUB_SECRET = 'dfdfsfsfsdfdsfs'



5. Setup pipeline for python-social-auth


    SOCIAL_AUTH_PIPELINE = (
        # Get the information we can about the user and return it in a simple
        # format to create the user instance later. On some cases the details are
        # already part of the auth response from the provider, but sometimes this
        # could hit a provider API.
        'social.pipeline.social_auth.social_details',

        # Get the social uid from whichever service we're authing thru. The uid is
        # the unique identifier of the given user in the provider.
        'social.pipeline.social_auth.social_uid',

        # Verifies that the current auth process is valid within the current
        # project, this is were emails and domains whitelists are applied (if
        # defined).
        'social.pipeline.social_auth.auth_allowed',

        # Checks if the current social-account is already associated in the site.
        'social.pipeline.social_auth.social_user',

        # Make up a username for this person, appends a random string at the end if
        # there's any collision.
        'social.pipeline.user.get_username',

        # Send a validation email to the user to verify its email address.
        # Disabled by default.
        # 'social.pipeline.mail.mail_validation',

        # Associates the current social details with another user account with
        # a similar email address. Disabled by default.
        'social.pipeline.social_auth.associate_by_email',

        # Create a user account if we haven't found one yet.
        'social.pipeline.user.create_user',

        # Create the record that associated the social account with this user.
        'social.pipeline.social_auth.associate_user',

        # Populate the extra_data field in the social record with the values
        # specified by settings (and the default ones like access_token, etc).
        'social.pipeline.social_auth.load_extra_data',

        # Update the user record with any changed info from the auth service.
        'social.pipeline.user.user_details',


        'jssocialauth.pipeline.sessionize',
    )



6. Setup a session field for django social auth:

    FIELDS_STORED_IN_SESSION = ['authkey']


urls.py
-------


hook up the app urls in your main urls.py:



    urlpatterns = patterns('',

        url('socialauth', include('drf_js_social.urls')),
        

)



