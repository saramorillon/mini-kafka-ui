package com.saramorillon.controllers.message;

import java.util.Collection;
import java.util.Map;
import org.cef.browser.CefBrowser;
import org.cef.browser.CefFrame;
import org.cef.callback.CefQueryCallback;
import com.google.gson.Gson;
import com.saramorillon.Consumer;
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
    public boolean onQuery(CefBrowser browser, CefFrame frame, long queryId, String request,
            boolean persistent, CefQueryCallback callback) {
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                // try {
                callback.success(new Gson().toJson(Consumer.consume()));
                // } catch (SQLException e) {
                // e.printStackTrace();
                // callback.failure(500, e.getMessage());
                // }

            }
        });
        thread.start();

        return true;
    }

    @Override
    public Response<Collection<Message>> onQuery(GetMessagesParams params,
            CefQueryCallback callback) {
        throw new Error("This method should have been bypassed");
    }
}
