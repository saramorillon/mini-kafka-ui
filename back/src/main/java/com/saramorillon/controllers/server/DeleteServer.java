package com.saramorillon.controllers.server;

import java.sql.SQLException;
import org.cef.callback.CefQueryCallback;
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
            Server.delete(server);
            return new Response<Void>(200);
        } catch (SQLException e) {
            e.printStackTrace();
            return new Response<Void>(500, e.getMessage());
        }
    }
}
