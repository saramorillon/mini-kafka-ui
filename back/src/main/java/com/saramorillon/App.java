
package com.saramorillon;

import java.awt.Component;
import java.awt.Dimension;
import java.awt.Point;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.IOException;
import java.net.URL;
import javax.swing.JFrame;
import org.cef.CefApp;
import org.cef.CefApp.CefAppState;
import org.cef.CefClient;
import org.cef.CefSettings.LogSeverity;
import org.cef.browser.CefBrowser;
import org.cef.handler.CefDisplayHandlerAdapter;
import com.saramorillon.controllers.config.OpenConfigDir;
import com.saramorillon.controllers.consumer.StartConsumer;
import com.saramorillon.controllers.consumer.StopConsumer;
import com.saramorillon.controllers.message.GetMessages;
import com.saramorillon.controllers.message.SendMessage;
import com.saramorillon.controllers.server.DeleteServer;
import com.saramorillon.controllers.server.GetServer;
import com.saramorillon.controllers.server.GetServers;
import com.saramorillon.controllers.server.SaveServer;
import com.saramorillon.controllers.topic.GetFavoriteTopics;
import com.saramorillon.controllers.topic.GetTopics;
import com.saramorillon.controllers.topic.ToggleFavoriteTopic;
import com.saramorillon.models.Window;
import me.friwi.jcefmaven.CefAppBuilder;
import me.friwi.jcefmaven.CefInitializationException;
import me.friwi.jcefmaven.MavenCefAppHandlerAdapter;
import me.friwi.jcefmaven.UnsupportedPlatformException;

class AppHandler extends MavenCefAppHandlerAdapter {
    @Override
    public void stateHasChanged(org.cef.CefApp.CefAppState state) {
        if (state == CefAppState.TERMINATED) {
            Dao.close();
            System.exit(0);
        }
    }
}


class WindowListener extends WindowAdapter {
    @Override
    public void windowClosing(WindowEvent e) {
        CefApp.getInstance().dispose();
        ((JFrame) e.getSource()).dispose();
    }
}


class ComponentListener extends ComponentAdapter {
    @Override
    public void componentMoved(ComponentEvent e) {
        Window window = Window.get();
        Point point = ((JFrame) e.getSource()).getLocation();
        window.x = (int) point.getX();
        window.y = (int) point.getY();
        Window.save(window);
    }

    @Override
    public void componentResized(ComponentEvent e) {
        Window window = Window.get();
        Dimension dimension = ((JFrame) e.getSource()).getSize();
        int state = ((JFrame) e.getSource()).getExtendedState();
        window.width = (int) dimension.getWidth();
        window.height = (int) dimension.getHeight();
        window.maximized = state == JFrame.MAXIMIZED_BOTH;
        Window.save(window);
    }
}


public class App {
    public static CefBrowser browser;

    public static void main(String[] args) throws UnsupportedPlatformException,
            CefInitializationException, IOException, InterruptedException {
        Dao.connect();
        CefAppBuilder builder = new CefAppBuilder();
        builder.getCefSettings().windowless_rendering_enabled = false;
        builder.setAppHandler(new AppHandler());

        CefClient client = builder.build().createClient();

        client.addMessageRouter(Router.route(new OpenConfigDir()));
        client.addMessageRouter(Router.route(new GetTopics()));
        client.addMessageRouter(Router.route(new GetFavoriteTopics()));
        client.addMessageRouter(Router.route(new ToggleFavoriteTopic()));
        client.addMessageRouter(Router.route(new GetServers()));
        client.addMessageRouter(Router.route(new GetServer()));
        client.addMessageRouter(Router.route(new SaveServer()));
        client.addMessageRouter(Router.route(new DeleteServer()));
        client.addMessageRouter(Router.route(new GetMessages()));
        client.addMessageRouter(Router.route(new SendMessage()));
        client.addMessageRouter(Router.route(new StartConsumer()));
        client.addMessageRouter(Router.route(new StopConsumer()));
        client.addDisplayHandler(new CefDisplayHandlerAdapter() {
            @Override
            public boolean onConsoleMessage(CefBrowser browser, LogSeverity level, String message,
                    String source, int line) {
                return true;
            }
        });

        browser = client.createBrowser(App.getUrl(), false, false);
        Component browserUI = browser.getUIComponent();

        Window window = Window.get();

        JFrame frame = new JFrame();
        frame.add(browserUI);
        if (window.maximized) {
            frame.setExtendedState(JFrame.MAXIMIZED_BOTH);
        }
        frame.setLocation(new Point(window.x, window.y));
        frame.setSize(window.width, window.height);
        frame.setVisible(true);
        frame.addWindowListener(new WindowListener());
        frame.addComponentListener(new ComponentListener());

        if (Env.getEnv().equals("dev")) {
            JFrame devTools = new JFrame();
            devTools.add(browser.getDevTools().getUIComponent());
            Thread.sleep(1000);
            devTools.setSize(800, 600);
            devTools.setVisible(true);
        }
    }

    private static String getUrl() {
        if (Env.getEnv().equals("dev")) {
            return "http://localhost:4000";
        }
        URL resource = App.class.getResource("index.html");
        return resource.toString();
    }
}
