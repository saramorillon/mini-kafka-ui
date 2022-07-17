from uuid import uuid4

from config import config
from models import Server


def getServers():
    return list(config.servers.values())


def getServer(key: str = None):
    return config.servers.get(key)


def saveServer(server: Server):
    if not server.get("key"):
        server["key"] = str(uuid4())
    config.servers[server["key"]] = server
    config.save()


def deleteServer(server: Server):
    config.servers.pop(server["key"])
    config.save()
