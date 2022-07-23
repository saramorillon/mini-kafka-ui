package com.saramorillon.controllers.topic;

import java.sql.SQLException;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Router;
import com.saramorillon.models.Favorite;
import com.saramorillon.models.Response;

public class ToggleFavoriteTopic extends Router<Favorite, Void> {
    public ToggleFavoriteTopic() {
        super(Favorite.class);
    }

    @Override
    public Response<Void> onQuery(Favorite favorite, CefQueryCallback callback) {
        try {
            if (Favorite.get(favorite.serverId, favorite.topic) != null) {
                Favorite.delete(favorite);
            } else {
                Favorite.save(favorite);
            }
            return new Response<Void>(200);
        } catch (SQLException e) {
            e.printStackTrace();
            return new Response<Void>(500, e.getMessage());
        }
    }
}
