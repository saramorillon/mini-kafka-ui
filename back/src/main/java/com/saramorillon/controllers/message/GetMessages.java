package com.saramorillon.controllers.message;

import java.util.Collection;
import java.util.Map;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Logger;
import com.saramorillon.Router;
import com.saramorillon.kafka.Consumer;
import com.saramorillon.models.Message;
import com.saramorillon.models.Response;

class GetMessagesParams {
    public int partition;
    public Map<String, String> filters;
    public int page;
    public int limit;
    public int direction;
}


public class GetMessages extends Router<GetMessagesParams, Collection<Message>> {
    public GetMessages() {
        super(GetMessagesParams.class);
    }

    @Override
    public Response<Collection<Message>> onQuery(GetMessagesParams params,
            CefQueryCallback callback) {
        Logger.info("get_messages");
        var consumer = Consumer.consumers.get(params.partition);
        var messages = consumer.consume(params.page, params.limit, params.direction);
        Logger.info("get_messages_success");
        return new Response<>(200, messages);
    }
}
