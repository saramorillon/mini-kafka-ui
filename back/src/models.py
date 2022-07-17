from typing import List, Optional, TypedDict


class Server(TypedDict):
    key: str
    name: str
    brokers: List[str]


class Favorite(TypedDict):
    name: str
    server: Server


class Window(TypedDict):
    x: Optional[int]
    y: Optional[int]
    width: Optional[int]
    height: Optional[int]


class Config(TypedDict):
    servers: List[Server]
    favorites: List[Favorite]
    window: Optional[Window]
