package com.saramorillon.kafka;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.atomic.AtomicBoolean;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.serialization.StringDeserializer;
import com.saramorillon.models.Message;

public class Consumer implements Runnable {
    public static Map<Integer, Consumer> consumers = new HashMap<>();

    private AtomicBoolean isStopped = new AtomicBoolean(false);
    private KafkaConsumer<String, String> consumer;
    public TopicPartition partition;

    public Consumer(String brokers, TopicPartition partition) {
        this.partition = partition;
        Consumer.consumers.put(partition.partition(), this);
        var deserializer = StringDeserializer.class.getName();
        var props = new Properties();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, brokers);
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, deserializer);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, deserializer);
        props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 10);
        this.consumer = new KafkaConsumer<>(props);
        this.consumer.assign(Arrays.asList(this.partition));
    }

    public void run() {
        while (!this.isStopped.get()) {
        }
        this.consumer.close();
    }

    public void stop() {
        this.isStopped.set(true);
    }

    public List<Message> consume(int page, int limit, int direction) {
        var count = this.count();
        var maxSize = (int) Math.min(count - ((page - 1) * limit), limit);
        if (direction == 1) {
            return this.consumeAsc(page, limit, maxSize);
        }
        return this.consumeDesc(page, limit, maxSize);
    }


    private List<Message> consumeAsc(int page, int limit, int count) {
        var offset = this.beginOffset() + (page - 1) * limit;
        this.consumer.seek(this.partition, offset);
        var messages = new ArrayList<Message>(count);
        while (messages.size() < count) {
            var records = this.consumer.poll(Duration.ofSeconds(2));
            for (var record : records) {
                messages.add(new Message(record));
            }
        }
        return messages;
    }


    private List<Message> consumeDesc(int page, int limit, int count) {
        var offset = this.endOffset() - page * limit;
        if (offset < 0) {
            count = (int) (-offset);
            offset = this.beginOffset();
        }
        this.consumer.seek(this.partition, offset);
        var messages = new ArrayList<Message>(count);
        while (messages.size() < count) {
            var records = this.consumer.poll(Duration.ofSeconds(2));
            for (var record : records) {
                messages.add(0, new Message(record));
            }
        }
        return messages.subList(messages.size() - count, messages.size());
    }

    public long count() {
        return this.endOffset() - this.beginOffset();
    }

    private long beginOffset() {
        return consumer.beginningOffsets(Arrays.asList(this.partition)).get(this.partition);
    }

    private long endOffset() {
        return consumer.endOffsets(Arrays.asList(this.partition)).get(this.partition);
    }
}
