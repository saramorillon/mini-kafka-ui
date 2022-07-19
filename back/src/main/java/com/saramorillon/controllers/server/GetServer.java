package com.saramorillon.controllers.server;

import java.io.IOException;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Config;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

public class GetServer extends Router<String, Server> {
    public GetServer() {
        super(String.class);
    }

    @Override
    public Response<Server> onQuery(String key, CefQueryCallback callback) {
        try {
            Config config = Config.get();
            return new Response<Server>(200, config.servers.get(key));
        } catch (IOException e) {
            e.printStackTrace();
            return new Response<Server>(500, e.getMessage());
        }
    }
}
