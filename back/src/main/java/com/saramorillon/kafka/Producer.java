package com.saramorillon.kafka;

import java.util.Properties;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;

public class Producer {
    private KafkaProducer<String, String> producer;
    private String topic;

    public Producer(String brokers, String topic) {
        this.topic = topic;
        var props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, brokers);
        props.put(ProducerConfig.ACKS_CONFIG, "all");
        this.producer = new KafkaProducer<>(props);
    }

    public void send(String key, String value) {
        this.producer.send(new ProducerRecord<String, String>(this.topic, key, value));
    }

    public void stop() {
        this.producer.close();
    }
}
