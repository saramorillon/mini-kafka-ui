package com.saramorillon.controllers.consumer;

import org.cef.callback.CefQueryCallback;
import com.saramorillon.Router;
import com.saramorillon.models.Response;

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
        return new Response<Void>(500, "Not implemented");
    }
}
