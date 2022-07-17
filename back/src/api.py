import subprocess
from typing import Dict

from config import config
from controllers.app import getApp
from controllers.consumer import startConsumer, stopConsumer
from controllers.message import getMessages, sendMessage
from controllers.server import deleteServer, getServer, getServers, saveServer
from controllers.topic import getFavoriteTopics, getTopics, toggleTopicFavorite
from kafka import KafkaService
from models import Server


class Api:
    def __init__(self):
        self.service = KafkaService()

    def onMove(self, x: int, y: int):
        config.window["x"] = x
        config.window["y"] = y
        config.save()

    def openConfigDir(self):
        subprocess.run(["explorer", config.dirpath])

    def getApp(self):
        getApp()

    def getServers(self):
        return getServers()

    def getServer(self, key: str = None):
        return getServer(key)

    def saveServer(self, server: Server):
        saveServer(server)

    def deleteServer(self, server: Server):
        deleteServer(server)

    def getTopics(self, key: str):
        return getTopics(key)

    def getFavoriteTopics(self):
        return getFavoriteTopics()

    def toggleTopicFavorite(self, key: str, topic: str):
        toggleTopicFavorite(key, topic)

    def startConsumer(self, key: str, topic: str):
        startConsumer(key, topic)

    def stopConsumer(self, key: str, topic: str):
        stopConsumer(key, topic)

    def getMessages(self, filters: Dict, page: int, limit: int):
        return getMessages(filter, page, limit)

    def sendMessage(self, key: str, topic: str, value: str):
        sendMessage(key, topic, value)
