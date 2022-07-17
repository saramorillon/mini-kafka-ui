from config import config


def getTopics(key: str):
    return []


def getFavoriteTopics():
    return list(
        map(
            lambda favorite: {
                "server": config.servers[favorite.server],
                "name": favorite.topic,
            },
            config.favorites,
        )
    )


def toggleTopicFavorite(key: str, topic: str):
    return None
