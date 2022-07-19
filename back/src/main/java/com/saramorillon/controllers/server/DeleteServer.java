package com.saramorillon.controllers.server;

import java.io.IOException;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Config;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

public class DeleteServer extends Router<Server, Void> {
    public DeleteServer() {
        super(Server.class);
    }

    @Override
    public Response<Void> onQuery(Server server, CefQueryCallback callback) {
        try {
            Config config = Config.get();
            config.servers.remove(server.key);
            Config.save();
            return new Response<Void>(200);
        } catch (IOException e) {
            e.printStackTrace();
            return new Response<Void>(500, e.getMessage());
        }
    }
}
