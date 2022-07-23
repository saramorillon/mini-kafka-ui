package com.saramorillon.controllers.message;

import java.sql.SQLException;
import java.util.Collection;
import java.util.Map;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Router;
import com.saramorillon.models.Message;
import com.saramorillon.models.Response;

class GetMessagesParams {
    public Map<String, String> filters;
    public int page;
    public int limit;
}


public class GetMessages extends Router<GetMessagesParams, Collection<Message>> {
    public GetMessages() {
        super(GetMessagesParams.class);
    }

    @Override
    public Response<Collection<Message>> onQuery(GetMessagesParams params,
            CefQueryCallback callback) {
        try {
            Collection<Message> messages = Message.get(params.filters, params.page, params.limit);
            return new Response<Collection<Message>>(200, messages);
        } catch (SQLException e) {
            e.printStackTrace();
            return new Response<Collection<Message>>(500, e.getMessage());
        }
    }
}
