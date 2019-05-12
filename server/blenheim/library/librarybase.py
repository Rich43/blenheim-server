from jinja2 import Environment, PackageLoader

from blenheim.config import Config


class LibraryBase:
    def __init__(self):
        self.env = Environment(loader=PackageLoader('blenheim', 'template'))
        self.config = Config()
