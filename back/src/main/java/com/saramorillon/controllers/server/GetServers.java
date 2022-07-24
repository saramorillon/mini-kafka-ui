package com.saramorillon.controllers.server;

import java.sql.SQLException;
import java.util.Collection;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Logger;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

public class GetServers extends Router<Void, Collection<Server>> {
    public GetServers() {
        super(Void.class);
    }

    @Override
    public Response<Collection<Server>> onQuery(Void params, CefQueryCallback callback) {
        Logger.info("get_servers");
        try {
            var servers = Server.get();
            Logger.info("get_servers_success");
            return new Response<>(200, servers);
        } catch (SQLException e) {
            Logger.error("get_servers_failure", e);
            e.printStackTrace();
            return new Response<>(500, e.getMessage());
        }
    }
}

