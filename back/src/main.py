from threading import Timer

import webview
from dotenv import dotenv_values

from api import Api
from config import config

env = dotenv_values(".env")
url = (
    "http://localhost:4000" if env.get("ENV", "prod") == "dev" else "public/index.html"
)

api = Api()


def tryMove(window):
    if config.window.get("x") != window.x or config.window.get("y") != window.y:
        config.window["x"] = window.x
        config.window["y"] = window.y
        config.save()
    timer = Timer(1, tryMove, [window])
    timer.start()


def on_resized(width, height):
    config.window["width"] = width
    config.window["height"] = height
    config.save()


def on_loaded():
    tryMove(window)


if __name__ == "__main__":
    config.load()
    window = webview.create_window(
        "Kui",
        url=url,
        js_api=api,
        x=config.window.get("x", None),
        y=config.window.get("y", None),
        width=config.window.get("width", 800),
        height=config.window.get("height", 600),
        on_top=True,
        text_select=True,
    )
    window.events.loaded += on_loaded
    window.events.resized += on_resized
    webview.start(debug=env.get("ENV", "prod") == "dev")
