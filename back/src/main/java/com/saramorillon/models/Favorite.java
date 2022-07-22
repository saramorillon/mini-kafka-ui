package com.saramorillon.models;

public class Favorite {
    public String server;
    public String topic;

    @Override
    public boolean equals(Object obj) {
        return obj != null && (obj instanceof Favorite) && ((Favorite) obj).topic.equals(this.topic)
                && ((Favorite) obj).server.equals(this.server);
    }
}
