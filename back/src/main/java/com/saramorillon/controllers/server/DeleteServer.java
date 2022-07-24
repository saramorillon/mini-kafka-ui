package com.saramorillon.controllers.server;

import java.sql.SQLException;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Logger;
import com.saramorillon.Router;
import com.saramorillon.models.Response;
import com.saramorillon.models.Server;

public class DeleteServer extends Router<Server, Void> {
    public DeleteServer() {
        super(Server.class);
    }

    @Override
    public Response<Void> onQuery(Server server, CefQueryCallback callback) {
        Logger.info("delete_server");
        try {
            Server.delete(server);
            Logger.info("delete_server_success");
            return new Response<>(200);
        } catch (SQLException e) {
            Logger.error("delete_server_failure", e);
            e.printStackTrace();
            return new Response<>(500, e.getMessage());
        }
    }
}
