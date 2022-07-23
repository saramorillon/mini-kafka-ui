package com.saramorillon.controllers.consumer;

import java.sql.SQLException;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Consumer;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

class StartConsumerParams {
    public int id;
    public String topic;
}


public class StartConsumer extends Router<StartConsumerParams, Void> {
    public StartConsumer() {
        super(StartConsumerParams.class);
    }

    @Override
    public Response<Void> onQuery(StartConsumerParams params, CefQueryCallback callback) {
        try {
            Server server = Server.get(params.id);
            Consumer.start(server, params.topic);
            return new Response<Void>(200);
        } catch (SQLException e) {
            e.printStackTrace();
            return new Response<Void>(500, e.getMessage());
        }
    }
}
