package com.saramorillon.controllers.server;

import java.io.IOException;
import java.util.UUID;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Config;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

public class SaveServer extends Router<Server, Void> {
    public SaveServer() {
        super(Server.class);
    }

    @Override
    public Response<Void> onQuery(Server server, CefQueryCallback callback) {
        try {
            Config config = Config.get();
            if (server.key == null || server.key.equals("")) {
                server.key = UUID.randomUUID().toString();
            }
            config.servers.put(server.key, server);
            Config.save();
            return new Response<Void>(200);
        } catch (IOException e) {
            e.printStackTrace();
            return new Response<Void>(500, e.getMessage());
        }
    }
}
