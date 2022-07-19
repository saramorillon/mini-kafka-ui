package com.saramorillon.controllers.consumer;

import org.cef.callback.CefQueryCallback;
import com.saramorillon.Router;
import com.saramorillon.models.Response;

public class StopConsumer extends Router<Void, Void> {
    public StopConsumer() {
        super(Void.class);
    }

    @Override
    public Response<Void> onQuery(Void params, CefQueryCallback callback) {
        return new Response<Void>(500, "Not implemented");
    }
}
