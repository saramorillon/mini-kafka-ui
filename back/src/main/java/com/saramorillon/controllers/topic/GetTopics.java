package com.saramorillon.controllers.topic;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.concurrent.ExecutionException;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Logger;
import com.saramorillon.Router;
import com.saramorillon.kafka.Admin;
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
        Logger.info("get_topics");
        try {
            var server = Server.get(id);
            var client = new Admin(server.brokers);
            var topics = client.listTopics();
            var result = new ArrayList<Topic>(topics.size());
            for (String name : topics) {
                Topic topic = new Topic();
                topic.serverId = server.id;
                topic.name = name;
                topic.favorite = Favorite.get(server.id, name) != null;
                topic.partitions = client.listPartitions(name).toArray(Integer[]::new);
                result.add(topic);
            }
            Logger.info("get_topics_success");
            return new Response<>(200, result);
        } catch (SQLException | InterruptedException | ExecutionException e) {
            Logger.error("get_topics_failure", e);
            e.printStackTrace();
            return new Response<>(500, e.getMessage());
        }
    }

}
