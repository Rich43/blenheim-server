from blenheim.library.librarybase import LibraryBase


class NamedConfLocal(LibraryBase):
    """
    Generate a named.conf.local File, used by bind.
    """

    def generate_named_conf_local(self) -> str:
        """
        Generate a named.conf.local file
        """
        template = self.env.get_template("dns/named.conf.local.jinja2")
        return template.render(domains=self.config["domains"].keys())
