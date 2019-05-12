from blenheim.library.librarybase import LibraryBase


class ZoneFile(LibraryBase):
    """
    Generate a Zone File, used by nsd and bind.
    """
    def generate_zones(self):
        """
        Generate the zones, return as a list of tuples.
        """
        result = []
        template = self.env.get_template('dns/zonefile.jinja2')
        ipv4 = self.config['settings']['ipv4']
        ipv6 = self.config['settings']['ipv6']
        std_subdomains = self.config['settings']['subdomains']
        if len(ipv4) < len(ipv6):
            ns_count = len(ipv6)
        else:
            ns_count = len(ipv4)
        for domain, sub_domains in self.config['domains'].items():
            template_output = template.render(domain=domain,
                                              ipv4=ipv4, ipv6=ipv6,
                                              nscount=ns_count,
                                              std_subdomains=std_subdomains,
                                              sub_domains=sub_domains,
                                              enumerate=enumerate)
            for dummy in range(5):
                template_output = template_output.replace("\n" * 2, "\n")
            result.append((domain, template_output))
        return result
