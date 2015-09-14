from setuptools import setup, find_packages
import sys, os

version = '0.1'

setup(
    name='ckanext-clipboard',
    version=version,
    description="Geoplatform Clipboard Extension",
    long_description='''
    ''',
    classifiers=[], # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
    keywords='',
    author='Daniel Kastl (Georepublic)',
    author_email='daniel@georepublic.de',
    url='http://georepublic.info',
    license='AGPL',
    packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
    namespace_packages=['ckanext', 'ckanext.clipboard'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[],
    entry_points='''
        [ckan.plugins]
        clipboard=ckanext.clipboard.plugin:Clipboard
    ''',
)
