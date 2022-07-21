package com.saramorillon.models;

public class Favorite {
    public Server server;
    public String topic;

    @Override
    public boolean equals(Object obj) {
        return obj != null && (obj instanceof Favorite) && ((Favorite) obj).topic == this.topic
                && ((Favorite) obj).server.equals(this.server);
    }
}
