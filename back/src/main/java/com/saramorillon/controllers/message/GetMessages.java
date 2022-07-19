package com.saramorillon.controllers.message;

import java.util.Map;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Router;
import com.saramorillon.models.Response;

class Params {
    public Map<String, String> filters;
    public int page;
    public int limit;
}


public class GetMessages extends Router<Params, Void> {
    public GetMessages() {
        super(Params.class);
    }

    @Override
    public Response<Void> onQuery(Params params, CefQueryCallback callback) {
        return new Response<Void>(500, "Not implemented");
    }
}
