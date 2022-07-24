package com.saramorillon;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.TopicDescription;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.serialization.StringDeserializer;
import com.saramorillon.models.Message;
import com.saramorillon.models.Server;

public class Consumer {
    private static KafkaConsumer<String, String> consumer;

    private static void createConsumer(Server server, Collection<TopicPartition> partitions) {
        String deserializer = StringDeserializer.class.getName();
        Properties props = new Properties();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, server.brokers);
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, deserializer);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, deserializer);
        props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 10);
        consumer = new KafkaConsumer<>(props);
        consumer.assign(partitions);
    }

    private static Collection<TopicPartition> listPartitions(Server server, String topic)
            throws InterruptedException, ExecutionException {
        Properties props = new Properties();
        props.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, server.brokers);
        AdminClient client = AdminClient.create(props);
        TopicDescription description =
                client.describeTopics(Arrays.asList(topic)).topicNameValues().get(topic).get();
        return description.partitions().stream()
                .map(info -> new TopicPartition(topic, info.partition())).toList();
    }

    public static void start(Server server, String topic)
            throws InterruptedException, ExecutionException {
        Collection<TopicPartition> partitions = listPartitions(server, topic);
        createConsumer(server, partitions);
    }

    public static Collection<Message> consume() {
        Set<TopicPartition> partitions = consumer.assignment();
        Map<TopicPartition, Long> offsets = consumer.endOffsets(partitions);
        List<Message> messages = new ArrayList<>();
        for (Entry<TopicPartition, Long> offset : offsets.entrySet()) {
            messages.addAll(consume(offset.getKey(), offset.getValue()));
        }
        messages.sort(new Comparator<Message>() {
            public int compare(Message o1, Message o2) {
                return (int) (o1.timestamp - o2.timestamp);
            };
        });
        return messages.subList(0, Math.min(messages.size(), 10));
    }

    public static Collection<Message> consume(TopicPartition partition, Long offset) {
        consumer.seek(partition, offset);
        ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(1000));
        Collection<Message> result = new ArrayList<Message>();
        records.forEach(record -> result.add(new Message(record)));
        return result;
    }

    public static void stop() {
        System.out.println("Stop consumer");
        consumer.close();
    }
}
