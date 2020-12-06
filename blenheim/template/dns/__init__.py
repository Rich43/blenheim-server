from os.path import dirname, join, exists


def get_zonefile():
    return join(dirname(__file__), 'zonefile.jinja2')
