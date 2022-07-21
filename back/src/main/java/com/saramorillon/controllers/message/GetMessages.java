package com.saramorillon.controllers.message;

import java.util.Map;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Router;
import com.saramorillon.models.Response;

class GetMessagesParams {
    public Map<String, String> filters;
    public int page;
    public int limit;
}


public class GetMessages extends Router<SendMessageParams, Void> {
    public GetMessages() {
        super(SendMessageParams.class);
    }

    @Override
    public Response<Void> onQuery(SendMessageParams params, CefQueryCallback callback) {
        return new Response<Void>(500, "Not implemented");
    }
}
