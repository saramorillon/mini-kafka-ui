package com.saramorillon;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.SQLException;
import java.time.Duration;
import java.util.Arrays;
import java.util.Collection;
import java.util.Properties;
import java.util.concurrent.atomic.AtomicBoolean;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRebalanceListener;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.serialization.StringDeserializer;
import com.saramorillon.models.Message;
import com.saramorillon.models.Server;

public class Consumer implements Runnable {
    private static Thread thread;
    private static Consumer instance;
    private final static AtomicBoolean closed = new AtomicBoolean(false);

    private KafkaConsumer<String, String> consumer;
    private Server server;
    private String topic;

    public Consumer(Server server, String topic) {
        super();
        this.server = server;
        this.topic = topic;

    }

    public static void start(Server server, String topic) {
        closed.set(false);
        instance = new Consumer(server, topic);
        thread = new Thread(instance);
        thread.start();
    }

    public static void stop() {
        System.out.println("Stop consumer");
        closed.set(true);
    }

    @Override
    public void run() {
        Properties props = new Properties();
        try {
            props.put(ConsumerConfig.GROUP_ID_CONFIG,
                    "kafka-desktop-client-" + InetAddress.getLocalHost().getHostName());
        } catch (UnknownHostException e1) {
            props.put(ConsumerConfig.GROUP_ID_CONFIG, "kafka-desktop-client-" + Math.random());
        }
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, this.server.brokers);
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
                StringDeserializer.class.getName());
        System.out.println("Start consumer");
        consumer = new KafkaConsumer<>(props);
        consumer.subscribe(Arrays.asList(this.topic), new ConsumerRebalanceListener() {
            @Override
            public void onPartitionsRevoked(Collection<TopicPartition> partitions) {}

            @Override
            public void onPartitionsAssigned(Collection<TopicPartition> partitions) {
                System.out.println("Seek to beginning");
                consumer.seekToBeginning(partitions);
            }
        });

        try {
            while (!closed.get()) {
                ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(1000));
                for (ConsumerRecord<String, String> record : records) {
                    Message.save(new Message(server.id, topic, record));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            consumer.close();
            thread.interrupt();
        }
    }
}
