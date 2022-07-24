package com.saramorillon.controllers.message;

import java.sql.SQLException;
import org.apache.kafka.common.Uuid;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Logger;
import com.saramorillon.Router;
import com.saramorillon.kafka.Producer;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

class SendMessageParams {
    public int id;
    public String topic;
    public String value;
}


public class SendMessage extends Router<SendMessageParams, Void> {
    public SendMessage() {
        super(SendMessageParams.class);
    }

    @Override
    public Response<Void> onQuery(SendMessageParams params, CefQueryCallback callback) {
        Logger.info("send_message");
        try {
            var server = Server.get(params.id);
            var producer = new Producer(server.brokers, params.topic);
            producer.send(Uuid.randomUuid().toString(), params.value);
            producer.stop();
            Logger.info("send_message_success");
            return new Response<>(200);
        } catch (SQLException e) {
            Logger.error("send_message_failure", e);
            e.printStackTrace();
            return new Response<>(500, e.getMessage());
        }
    }
}
