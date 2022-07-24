package com.saramorillon.controllers.message;

import java.util.Map;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Logger;
import com.saramorillon.Router;
import com.saramorillon.kafka.Consumer;
import com.saramorillon.models.Response;

class CountMessagesParams {
    public int partition;
    public Map<String, String> filters;
    public int limit;
}


public class CountMessages extends Router<CountMessagesParams, Double> {
    public CountMessages() {
        super(CountMessagesParams.class);
    }

    @Override
    public Response<Double> onQuery(CountMessagesParams params, CefQueryCallback callback) {
        Logger.info("count_messages");
        var consumer = Consumer.consumers.get(params.partition);
        Logger.info("count_messages_success");
        return new Response<>(200, Math.ceil(consumer.count() / (double) params.limit));
    }
}
