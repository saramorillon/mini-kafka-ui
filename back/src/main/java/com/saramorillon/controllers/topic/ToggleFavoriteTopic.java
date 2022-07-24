package com.saramorillon.controllers.topic;

import java.sql.SQLException;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Logger;
import com.saramorillon.Router;
import com.saramorillon.models.Favorite;
import com.saramorillon.models.Response;

public class ToggleFavoriteTopic extends Router<Favorite, Void> {
    public ToggleFavoriteTopic() {
        super(Favorite.class);
    }

    @Override
    public Response<Void> onQuery(Favorite favorite, CefQueryCallback callback) {
        Logger.info("toggle_favorite_topic");
        try {
            if (Favorite.get(favorite.serverId, favorite.topic) != null) {
                Favorite.delete(favorite);
            } else {
                Favorite.save(favorite);
            }
            Logger.info("toggle_favorite_topic_success");
            return new Response<>(200);
        } catch (SQLException e) {
            Logger.error("toggle_favorite_topic_failure", e);
            e.printStackTrace();
            return new Response<>(500, e.getMessage());
        }
    }
}
