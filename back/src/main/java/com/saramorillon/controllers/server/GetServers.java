package com.saramorillon.controllers.server;

import java.sql.SQLException;
import java.util.Collection;
import org.cef.callback.CefQueryCallback;
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
            Collection<Server> servers = Server.get();
            return new Response<Collection<Server>>(200, servers);
        } catch (SQLException e) {
            e.printStackTrace();
            return new Response<Collection<Server>>(500, e.getMessage());
        }
    }
}

