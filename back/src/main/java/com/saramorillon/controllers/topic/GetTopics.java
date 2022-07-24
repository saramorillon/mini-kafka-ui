package com.saramorillon.controllers.topic;

import java.sql.SQLException;
import java.util.ArrayList;
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
import com.saramorillon.Router;
import com.saramorillon.models.Favorite;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;
import com.saramorillon.models.Topic;

public class GetTopics extends Router<Integer, Collection<Topic>> {
    public GetTopics() {
        super(Integer.class);
    }

    @Override
    public Response<Collection<Topic>> onQuery(Integer id, CefQueryCallback callback) {
        try {
            Server server = Server.get(id);
            Collection<Topic> topics = this.getTopics(server);
            return new Response<Collection<Topic>>(200, topics);
        } catch (SQLException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return new Response<Collection<Topic>>(500, e.getMessage());
        }
    }

    private Collection<Topic> getTopics(Server server)
            throws InterruptedException, ExecutionException, SQLException {
        Properties properties = new Properties();
        properties.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, server.brokers);
        AdminClient admin = AdminClient.create(properties);

        ListTopicsOptions options = new ListTopicsOptions();
        options.listInternal(false);

        Set<String> topics = admin.listTopics(options).names().get();
        Map<String, KafkaFuture<TopicDescription>> descriptions =
                admin.describeTopics(topics).topicNameValues();

        Collection<Topic> result = new ArrayList<>(topics.size());
        for (String name : topics) {
            Topic topic = new Topic();
            topic.serverId = server.id;
            topic.name = name;
            topic.favorite = Favorite.get(server.id, name) != null;
            topic.partitions = descriptions.get(name).get().partitions().toArray(new Integer[] {});
            result.add(topic);
        }
        return result;
    }
}
