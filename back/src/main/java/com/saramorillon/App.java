
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
import org.cef.browser.CefBrowser;
import org.cef.browser.CefMessageRouter;
import org.cef.browser.CefMessageRouter.CefMessageRouterConfig;
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
import me.friwi.jcefmaven.CefAppBuilder;
import me.friwi.jcefmaven.CefInitializationException;
import me.friwi.jcefmaven.MavenCefAppHandlerAdapter;
import me.friwi.jcefmaven.UnsupportedPlatformException;

class AppHandler extends MavenCefAppHandlerAdapter {
    @Override
    public void stateHasChanged(org.cef.CefApp.CefAppState state) {
        if (state == CefAppState.TERMINATED) {
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
        try {
            Config config = Config.get();
            Point point = ((JFrame) e.getSource()).getLocation();
            config.window.x = (int) point.getX();
            config.window.y = (int) point.getY();
            Config.save();
        } catch (IOException e1) {
            e1.printStackTrace();
        }
    }

    @Override
    public void componentResized(ComponentEvent e) {
        try {
            Config config = Config.get();
            Dimension dimension = ((JFrame) e.getSource()).getSize();
            int state = ((JFrame) e.getSource()).getExtendedState();
            config.window.width = (int) dimension.getWidth();
            config.window.height = (int) dimension.getHeight();
            config.window.maximized = state == JFrame.MAXIMIZED_BOTH;
            Config.save();
        } catch (IOException e1) {
            e1.printStackTrace();
        }
    }
}


public class App {

    public static void main(String[] args) throws UnsupportedPlatformException,
            CefInitializationException, IOException, InterruptedException {
        CefAppBuilder builder = new CefAppBuilder();
        builder.getCefSettings().windowless_rendering_enabled = false;
        builder.setAppHandler(new AppHandler());

        CefClient client = builder.build().createClient();

        client.addMessageRouter(CefMessageRouter.create(
                new CefMessageRouterConfig("OpenConfigDir", "OpenConfigDirAbort"),
                new OpenConfigDir()));
        client.addMessageRouter(CefMessageRouter.create(
                new CefMessageRouterConfig("GetTopics", "GetTopicsAbort"), new GetTopics()));
        client.addMessageRouter(CefMessageRouter.create(
                new CefMessageRouterConfig("GetFavoriteTopics", "GetFavoriteTopicsAbort"),
                new GetFavoriteTopics()));
        client.addMessageRouter(CefMessageRouter.create(
                new CefMessageRouterConfig("ToggleFavoriteTopic", "ToggleFavoriteTopicAbort"),
                new ToggleFavoriteTopic()));
        client.addMessageRouter(CefMessageRouter.create(
                new CefMessageRouterConfig("GetServers", "GetServersAbort"), new GetServers()));
        client.addMessageRouter(CefMessageRouter.create(
                new CefMessageRouterConfig("GetServer", "GetServerAbort"), new GetServer()));
        client.addMessageRouter(CefMessageRouter.create(
                new CefMessageRouterConfig("SaveServer", "SaveServerAbort"), new SaveServer()));
        client.addMessageRouter(CefMessageRouter.create(
                new CefMessageRouterConfig("DeleteServer", "DeleteServerAbort"),
                new DeleteServer()));
        client.addMessageRouter(CefMessageRouter.create(
                new CefMessageRouterConfig("GetMessages", "GetMessagesAbort"), new GetMessages()));
        client.addMessageRouter(CefMessageRouter.create(
                new CefMessageRouterConfig("SendMessage", "SendMessageAbort"), new SendMessage()));
        client.addMessageRouter(CefMessageRouter.create(
                new CefMessageRouterConfig("StartConsumer", "StartConsumerAbort"),
                new StartConsumer()));
        client.addMessageRouter(CefMessageRouter.create(
                new CefMessageRouterConfig("StopConsumer", "StopConsumerAbort"),
                new StopConsumer()));

        CefBrowser browser = client.createBrowser(App.getUrl(), false, false);
        Component browserUI = browser.getUIComponent();

        Config config = Config.get();

        JFrame frame = new JFrame();
        frame.add(browserUI);
        if (config.window.maximized) {
            frame.setExtendedState(JFrame.MAXIMIZED_BOTH);
        }
        frame.setLocation(new Point(config.window.x, config.window.y));
        frame.setSize(config.window.width, config.window.height);
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
