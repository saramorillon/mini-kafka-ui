package com.saramorillon.controllers.topic;

import java.io.IOException;
import java.util.Collection;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.ListTopicsOptions;
import org.apache.kafka.clients.admin.TopicDescription;
import org.apache.kafka.common.KafkaFuture;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Config;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;
import com.saramorillon.models.Topic;

public class GetTopics extends Router<String, Collection<Topic>> {
    public GetTopics() {
        super(String.class);
    }

    @Override
    public Response<Collection<Topic>> onQuery(String key, CefQueryCallback callback) {
        try {
            Config config = Config.get();
            Server server = config.servers.get(key);
            Properties properties = new Properties();
            properties.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, server.brokers);
            AdminClient admin = AdminClient.create(properties);
            ListTopicsOptions options = new ListTopicsOptions();
            options.listInternal(false);
            Set<String> topics = admin.listTopics(options).names().get();
            Map<String, KafkaFuture<TopicDescription>> descriptions =
                    admin.describeTopics(topics).topicNameValues();

            return new Response<Collection<Topic>>(200, topics.stream().map((String name) -> {
                Topic topic = new Topic();
                topic.name = name;
                topic.favorite = config.isFavorite(key, name);
                try {
                    topic.partitions = descriptions.get(name).get().partitions().size();
                } catch (ExecutionException | InterruptedException e) {
                    e.printStackTrace();
                }
                return topic;
            }).toList());
        } catch (IOException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return new Response<Collection<Topic>>(500, e.getMessage());
        }
    }
}
