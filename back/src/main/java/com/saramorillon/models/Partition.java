package com.saramorillon.models;

import java.util.Collection;

public class Partition {
    public int index;
    public Collection<Message> messages;

    public Partition(int index, Collection<Message> messages) {
        this.index = index;
        this.messages = messages;
    }
}
