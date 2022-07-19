package com.saramorillon.controllers.topic;

import java.io.IOException;
import java.util.Properties;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.ListTopicsResult;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Config;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

public class GetTopics extends Router<String, ListTopicsResult> {
    public GetTopics() {
        super(String.class);
    }

    @Override
    public Response<ListTopicsResult> onQuery(String key, CefQueryCallback callback) {
        try {
            Server server = Config.get().servers.get(key);
            Properties config = new Properties();
            config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, server.brokers);
            AdminClient admin = AdminClient.create(config);
            ListTopicsResult topics = admin.listTopics();
            return new Response<ListTopicsResult>(200, topics);
        } catch (IOException e) {
            e.printStackTrace();
            return new Response<ListTopicsResult>(500, e.getMessage());
        }
    }
}
