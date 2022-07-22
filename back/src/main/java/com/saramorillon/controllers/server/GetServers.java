package com.saramorillon.controllers.server;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Config;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

public class GetServers extends Router<Void, Map<String, Server>> {
    public GetServers() {
        super(Void.class);
    }

    @Override
    public Response<Map<String, Server>> onQuery(Void params, CefQueryCallback callback) {
        try {
            Config config = Config.get();
            return new Response<Map<String, Server>>(200, new HashMap<>(config.servers));
        } catch (IOException e) {
            e.printStackTrace();
            return new Response<Map<String, Server>>(500, e.getMessage());
        }
    }
}

