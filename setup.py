import os
from setuptools import setup, find_packages


def read(file_name):
    return open(os.path.join(os.path.dirname(__file__), file_name)).read()


setup(
    name='blenheim-server',
    version='0.0.' + (os.getenv('GITHUB_RUN_ID') or '1'),
    author='Richard Ward',
    author_email='richies@gmail.com',
    description='A dns server managed through a simple web interface',
    license='BSD',
    keywords='dns server',
    url='http://pynguins.com',
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    include_package_data=True,
    install_requires=['starlette', 'starlette-graphene3', 'uvicorn', 'jinja2', 'graphene', 'docker'],
    long_description=read('README.md'),
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Topic :: Utilities',
        'License :: OSI Approved :: BSD License',
    ],
)
