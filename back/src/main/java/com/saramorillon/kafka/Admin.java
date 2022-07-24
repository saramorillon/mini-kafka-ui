package com.saramorillon.kafka;

import java.util.Arrays;
import java.util.Collection;
import java.util.Properties;
import java.util.concurrent.ExecutionException;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.ListTopicsOptions;

public class Admin {
    private AdminClient client;

    public Admin(String brokers) {
        var props = new Properties();
        props.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, brokers);
        client = AdminClient.create(props);
    }

    public Collection<String> listTopics() throws InterruptedException, ExecutionException {
        var options = new ListTopicsOptions();
        options.listInternal(false);
        return client.listTopics(options).names().get();
    }

    public Collection<Integer> listPartitions(String topic)
            throws InterruptedException, ExecutionException {
        var descriptions =
                client.describeTopics(Arrays.asList(topic)).topicNameValues().get(topic).get();
        return descriptions.partitions().stream().map(info -> info.partition()).toList();
    }
}
