import { Outlet, useNavigate } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Cached as CachedIcon,
  Download as DownloadIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material/";
import useAccessToken from "../hooks/useAccessToken";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

function Layout() {
  const { accessToken } = useAccessToken();
  const { loginWithRedirect, logout } = useAuth0();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevOpen) => !prevOpen);
  };

  const drawerWidth = 240;

  const navigate = useNavigate();

  const permLinks = [
    {
      text: "Generator",
      action: () => navigate("/"),
      icon: <CachedIcon />,
    },
  ];

  const authLinks = [
    {
      text: "Profile",
      action: () => navigate("/profile"),
      icon: <AccountCircleIcon />,
    },
    {
      text: "Saved Images",
      action: () => navigate("/saved"),
      icon: <DownloadIcon />,
    },
    {
      text: "Sign Out",
      action: () =>
        logout({
          logoutParams: { returnTo: window.location.origin },
        }),
      icon: <LogoutIcon />,
    },
  ];

  const noAuthLinks = [
    { text: "Sign In", action: () => loginWithRedirect(), icon: <LoginIcon /> },
  ];

  permLinks.forEach((item) => {
    authLinks.unshift(item);
    noAuthLinks.unshift(item);
  });

  const drawer = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {accessToken
          ? authLinks.map(({ text, action, icon }) => (
              <ListItem disablePadding>
                <ListItemButton onClick={action}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))
          : noAuthLinks.map(({ text, action, icon }) => (
              <ListItem disablePadding>
                <ListItemButton onClick={action}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <AppBar
        position="static"
        sx={{
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            AI IMAGE GENERATOR
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: `${drawerWidth}px` },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": { width: drawerWidth },
            display: { xs: "none", md: "block" },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": { width: drawerWidth },
            display: { xs: "block", md: "none" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Container maxWidth="lg" sx={{ p: 3 }}>
          <Outlet context={{ accessToken }} />
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;
