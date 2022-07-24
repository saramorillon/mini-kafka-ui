package com.saramorillon.controllers.consumer;

import java.sql.SQLException;
import java.util.Collection;
import java.util.concurrent.ExecutionException;
import org.apache.kafka.common.TopicPartition;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Logger;
import com.saramorillon.Router;
import com.saramorillon.kafka.Admin;
import com.saramorillon.kafka.Consumer;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

class StartConsumerParams {
    public int id;
    public String topic;
}


public class StartConsumer extends Router<StartConsumerParams, Collection<Integer>> {
    public StartConsumer() {
        super(StartConsumerParams.class);
    }

    @Override
    public Response<Collection<Integer>> onQuery(StartConsumerParams params,
            CefQueryCallback callback) {
        Logger.info("start_consumer");
        try {
            var server = Server.get(params.id);
            var admin = new Admin(server.brokers);
            var partitions = admin.listPartitions(params.topic);
            for (var partition : partitions) {
                var topicPartition = new TopicPartition(params.topic, partition);
                var consumer = new Consumer(server.brokers, topicPartition);
                var thread = new Thread(consumer);
                thread.start();
            }
            Logger.info("start_consumer_success");
            return new Response<>(200, partitions);
        } catch (SQLException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
            Logger.error("start_consumer_failure", e);
            return new Response<>(500, e.getMessage());
        }
    }
}
