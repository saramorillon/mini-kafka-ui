package com.saramorillon.controllers.server;

import java.io.IOException;
import java.util.Collection;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Config;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

public class GetServers extends Router<Void, Collection<Server>> {
    public GetServers() {
        super(Void.class);
    }

    @Override
    public Response<Collection<Server>> onQuery(Void params, CefQueryCallback callback) {
        try {
            Config config = Config.get();
            return new Response<Collection<Server>>(200, config.servers.values());
        } catch (IOException e) {
            e.printStackTrace();
            return new Response<Collection<Server>>(500, e.getMessage());
        }
    }
}

