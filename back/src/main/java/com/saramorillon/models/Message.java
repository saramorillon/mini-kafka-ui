package com.saramorillon.models;

import org.apache.kafka.clients.consumer.ConsumerRecord;

public class Message {
    int partition;
    long offset;
    long timestamp;
    String key;
    String value;

    public Message(ConsumerRecord<String, String> record) {
        this.partition = record.partition();
        this.offset = record.offset();
        this.timestamp = record.timestamp();
        this.key = record.key();
        this.value = record.value();
    }
}
