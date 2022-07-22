package com.saramorillon.controllers.consumer;

import java.io.IOException;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Config;
import com.saramorillon.Consumer;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

class StartConsumerParams {
    public String key;
    public String topic;
}


public class StartConsumer extends Router<StartConsumerParams, Void> {
    public StartConsumer() {
        super(StartConsumerParams.class);
    }

    @Override
    public Response<Void> onQuery(StartConsumerParams params, CefQueryCallback callback) {
        try {
            Config config = Config.get();
            Server server = config.servers.get(params.key);
            Consumer.start(server, params.topic);
            return new Response<Void>(200);
        } catch (IOException e) {
            e.printStackTrace();
            return new Response<Void>(500, e.getMessage());
        }
    }
}
