package com.saramorillon.controllers.consumer;

import org.cef.callback.CefQueryCallback;
import com.saramorillon.Logger;
import com.saramorillon.Router;
import com.saramorillon.kafka.Consumer;
import com.saramorillon.models.Response;

public class StopConsumer extends Router<Void, Void> {
    public StopConsumer() {
        super(Void.class);
    }

    @Override
    public Response<Void> onQuery(Void params, CefQueryCallback callback) {
        Logger.info("stop_consumer");
        for (var consumer : Consumer.consumers.values()) {
            consumer.stop();
        }
        Consumer.consumers.clear();
        Logger.info("stop_consumer_success");
        return new Response<>(200);
    }
}
