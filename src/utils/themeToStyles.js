let styles = {
  body: {
    background: "#fafafa",
    color: "#121212",

    "font-size": "100%",
    "line-height": "normal",
  },
  p: {
    color: "#ffffff",

    "font-size": "100%",
    "line-height": "normal",
  },
  li: {
    color: "#ffffff",

    "font-size": "100%",
    "line-height": "normal",
  },
  h1: {
    color: "#ffffff",
  },
};

export default function (theme) {
  styles.body = {
    background: theme.bg,
    color: theme.fg,

    "font-size": theme.size,
    "line-height": theme.height,
  };
  styles.p = {
    color: theme.fg,

    "font-size": theme.size,
    "line-height": theme.height,
  };
  styles.li = {
    color: theme.fg,

    "font-size": theme.size,
    "line-height": theme.height,
  };
  styles.h1.color = theme.fg;
  return styles;
}
