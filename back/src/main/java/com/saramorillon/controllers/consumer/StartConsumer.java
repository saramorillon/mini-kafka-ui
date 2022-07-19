package com.saramorillon.controllers.consumer;

import org.cef.callback.CefQueryCallback;
import com.saramorillon.Router;
import com.saramorillon.models.Response;

class Params {
    public String key;
    public String topic;
}


public class StartConsumer extends Router<Params, Void> {
    public StartConsumer() {
        super(Params.class);
    }

    @Override
    public Response<Void> onQuery(Params params, CefQueryCallback callback) {
        return new Response<Void>(500, "Not implemented");
    }
}
