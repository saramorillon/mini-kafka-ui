package com.saramorillon.models;

import org.apache.kafka.clients.consumer.ConsumerRecord;

public class Message {
    public int serverId;
    public String topic;
    public int partition;
    public long offset;
    public long timestamp;
    public String key;
    public String value;

    public Message(ConsumerRecord<String, String> record) {
        this.partition = record.partition();
        this.offset = record.offset();
        this.timestamp = record.timestamp();
        this.key = record.key();
        this.value = record.value();
    }
}
