package com.saramorillon.controllers.server;

import java.sql.SQLException;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

public class GetServer extends Router<Integer, Server> {
    public GetServer() {
        super(Integer.class);
    }

    @Override
    public Response<Server> onQuery(Integer id, CefQueryCallback callback) {
        try {
            Server server = Server.get(id);
            return new Response<Server>(200, server);
        } catch (SQLException e) {
            e.printStackTrace();
            return new Response<Server>(500, e.getMessage());
        }
    }
}
