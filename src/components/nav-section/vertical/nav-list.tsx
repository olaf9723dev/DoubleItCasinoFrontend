import { useState, useEffect, useCallback } from 'react';
// @mui
import Collapse from '@mui/material/Collapse';
import { Stack, useMediaQuery } from '@mui/material';
import Popover from '@mui/material/Popover';
import { appBarClasses } from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
// routes
import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';
//
import { NavListProps, NavConfigProps } from '../types';
import NavItem from './nav-item';

// ----------------------------------------------------------------------

type NavListRootProps = {
  data: NavListProps;
  depth: number;
  hasChild: boolean;
  config: NavConfigProps;
};

export default function NavList({ data, depth, hasChild, config }: NavListRootProps) {
  const pathname = usePathname();
  const active = useActiveLink(data.path, hasChild);

  const externalLink = data.path.includes('http');

  const [open, setOpen] = useState(active);

  useEffect(() => {
    if (!active) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const themes = useTheme();
  const mediaDown = useMediaQuery(themes.breakpoints.down('lg'));
  if (!mediaDown) {
    if (data.type === 'desktop')
      return (
        <>
          <NavItem
            item={data}
            depth={depth}
            open={open}
            active={active}
            externalLink={externalLink}
            onClick={handleToggle}
            config={config}
            sx={{
              px: `24px`,
              py: `14px`,
              background: active
                ? `linear-gradient(90deg, rgb(41 37 83) 0%, rgb(19 20 38) 100%)`
                : ``,
              borderLeft: active ? '4px solid' : ``,
              borderColor: (theme) => theme.palette.primary.main,
              borderRadius: `1.1px !important`
            }}
          />

          {hasChild && (
            <Collapse in={open} unmountOnExit>
              <NavSubList data={data.children} depth={depth} config={config} />
            </Collapse>
          )}
        </>
      );
  } else
    return (
      <>
        <NavItem
          item={data}
          depth={depth}
          open={open}
          active={active}
          externalLink={externalLink}
          onClick={handleToggle}
          config={config}
          sx={{
            px: `24px`,
            py: `14px`,
            background: active
              ? `linear-gradient(90deg, rgb(41 37 83) 0%, rgb(19 20 38) 100%)`
              : ``,
            borderLeft: active ? '4px solid' : ``,
            borderColor: (theme) => theme.palette.primary.main,
            borderRadius: `1.1px !important`
          }}
        />

        {hasChild && (
          <Collapse in={open} unmountOnExit>
            <NavSubList data={data.children} depth={depth} config={config} />
          </Collapse>
        )}
      </>
    );
}

// ----------------------------------------------------------------------

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
  config: NavConfigProps;
};

function NavSubList({ data, depth, config }: NavListSubProps) {
  return (
    <Stack spacing={0.5}>
      {data.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={depth + 1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </Stack>
  );
}
