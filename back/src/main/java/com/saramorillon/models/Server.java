package com.saramorillon.models;

public class Server {
    public String key;
    public String name;
    public String brokers;

    @Override
    public boolean equals(Object obj) {
        return obj != null && (obj instanceof Server) && ((Server) obj).key == this.key;
    }
}
