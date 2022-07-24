package com.saramorillon.controllers.server;

import java.sql.SQLException;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Logger;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

public class GetServer extends Router<Integer, Server> {
    public GetServer() {
        super(Integer.class);
    }

    @Override
    public Response<Server> onQuery(Integer id, CefQueryCallback callback) {
        Logger.info("get_server");
        try {
            var server = Server.get(id);
            Logger.info("get_server_success");
            return new Response<>(200, server);
        } catch (SQLException e) {
            Logger.error("get_server_failure", e);
            e.printStackTrace();
            return new Response<>(500, e.getMessage());
        }
    }
}
