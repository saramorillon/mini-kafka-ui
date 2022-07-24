package com.saramorillon.controllers.topic;

import java.sql.SQLException;
import java.util.Collection;
import org.cef.callback.CefQueryCallback;
import com.saramorillon.Logger;
import com.saramorillon.Router;
import com.saramorillon.models.Favorite;
import com.saramorillon.models.Response;

public class GetFavoriteTopics extends Router<Void, Collection<Favorite>> {
    public GetFavoriteTopics() {
        super(Void.class);
    }

    @Override
    public Response<Collection<Favorite>> onQuery(Void params, CefQueryCallback callback) {
        Logger.info("get_favorite_topics");
        try {
            var favorites = Favorite.get();
            Logger.info("get_favorite_topics_success");
            return new Response<>(200, favorites);
        } catch (SQLException e) {
            Logger.error("get_favorite_topics_failure", e);
            e.printStackTrace();
            return new Response<>(500, e.getMessage());
        }
    }
}
