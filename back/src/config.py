import json
import os
import os.path
from platform import system
from typing import Dict, List

from models import Favorite, Server, Window

homeDir = os.path.expanduser("~")


class Config:
    dirpath: str
    filepath: str
    servers: Dict[str, Server] = {}
    favorites: List[Favorite] = []
    window: Window = {}

    def __init__(self) -> None:
        platform = system()
        self.dirpath = homeDir + "/.local/share/mini-kafka-ui"
        if platform == "Windows":
            self.dirpath = homeDir + "\\AppData\\Roaming\\mini-kafka-ui"
        elif platform == "Darwin":
            self.dirpath = homeDir + "/Library/Preferences/mini-kafka-ui"
        self.filepath = self.dirpath + "/config.json"

    def load(self):
        if not os.path.exists(self.filepath):
            self.save()

        with open(self.filepath, "r") as f:
            config = json.load(f)
            self.servers = config.get("servers", {})
            self.favorites = config.get("favorites", {})
            self.window = config.get("window", {})

    def save(self):
        with open(self.filepath, "w") as f:
            json.dump(
                {
                    "servers": self.servers,
                    "favorites": self.favorites,
                    "window": self.window,
                },
                f,
            )


config = Config()
