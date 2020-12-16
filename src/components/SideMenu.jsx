import React, { useState, forwardRef } from 'react';
import { List, ListItem, Collapse, Button, Drawer } from '@material-ui/core';
import clsx from 'clsx';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { NavLink as RouterLink } from 'react-router-dom';
import { Dots } from '@brainhubeu/react-carousel';

import menuItems from './sideBarItems';
import useStyles from './menuBarStyles';

const MenuBar = props => {
  const [value, setValue] = props ? props : useState(0);
  const [menu, setMenu] = useState({});
  const { className, ...rest } = props;
  const classes = useStyles();

  console.log(props);
  
  const onChange = param => {
    setValue(param);
  };
  const handleClick = item => {
    const newData = { ...menu, [item]: !menu[item] };
    setMenu(newData);
  };
  const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <a {...props} />
    </div>
  ));
  const handleMenu = (children, level = 0) =>
    children.map(({ children, name, url, links }) => {
      if (!children) {
        return (
          <List component="div" disablePadding key={name}>
            <ListItem className={classes.item} disableGutters style={{ padding: '0px' }} key={name}>
              <Button
                className={clsx({
                  [classes.btnRoot]: true,
                  [classes.button]: true,
                  [classes.subMenu]: level,
                })}
                component={CustomRouterLink}
                to={url}
              >
                {name}
              </Button>
              <Dots value={value} onChange={onChange} number={30} />
            </ListItem>
          </List>
        );
      }
      return (
        <div key={name}>
          <ListItem className={classes.item} disableGutters key={name} onClick={() => handleClick(name)}>
            <Button
              className={clsx({
                [classes.btnRoot]: true,
                [classes.button]: true,
                [classes.subMenu]: level,
              })}
            >
              {name} {menu[name] ? <ExpandLess /> : <ExpandMore />}
            </Button>
          </ListItem>
          <Collapse in={!!menu[name]} timeout="auto" unmountOnExit>
            {handleMenu(children, 1)}
          </Collapse>
        </div>
      );
    });

  return (
    <Drawer anchor="left" classes={{ paper: classes.drawer }} open variant="persistent">
      <List {...rest} className={clsx(classes.root, className)}>
        {handleMenu(menuItems.data)}
      </List>
    </Drawer>
  );
};

export default MenuBar;
