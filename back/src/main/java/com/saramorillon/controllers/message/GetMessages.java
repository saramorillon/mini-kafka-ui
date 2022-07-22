package com.saramorillon.controllers.message;

import java.util.ArrayList;
import java.util.Map;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Router;
import com.saramorillon.models.Response;

class GetMessagesParams {
    public Map<String, String> filters;
    public int page;
    public int limit;
}


public class GetMessages extends Router<GetMessagesParams, ArrayList<Void>> {
    public GetMessages() {
        super(GetMessagesParams.class);
    }

    @Override
    public Response<ArrayList<Void>> onQuery(GetMessagesParams params, CefQueryCallback callback) {
        return new Response<ArrayList<Void>>(200, new ArrayList<>());
    }
}
