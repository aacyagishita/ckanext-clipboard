import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit

class Clipboard(plugins.SingletonPlugin):
    '''
    This plugin provides customisation specific to Clipboard.
    '''
    plugins.implements(plugins.IConfigurer)

    def update_config(self, config):

        # Add plugin's template directory
        toolkit.add_template_directory(config, 'templates')

        # Add plugin's js/css directory
        toolkit.add_resource('fanstatic', 'clipboard-base')
        toolkit.add_resource('fanstatic', 'clipboard-core')
